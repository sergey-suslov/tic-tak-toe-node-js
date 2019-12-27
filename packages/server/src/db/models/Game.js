import _ from 'lodash'
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  userId: { type: String, required: false },
  field: [[{ type: Number, required: true }]],
  history: [{ turn: { type: String, required: true }, side: { type: String, required: true } }],
  winner: { type: String, required: false },
  date: { type: Date, default: Date.now }
})

schema.statics.initNewGame = async function(userId) {
  return this.create({
    userId,
    history: [],
    field: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  })
}

schema.methods.makeTurn = async function(row, col, side = 1) {
  if (this.field[row][col]) return

  this.field[row][col] = side
  this.history.push({ turn: `${row},${col}`, side })
  this.markModified('history')
  this.markModified('field')
  await this.save()
  return this
}

schema.methods.getCol = function(i) {
  return this.field.map(row => row[i])
}

const findSequence = game => {
  let winner = game.field.filter(row => row.every(b => b === 1) || row.every(b => b === 2))
  if (winner.length) return winner[0][0]
  winner = [0, 1, 2].map(colIndex => game.getCol(colIndex)).filter(col => col.every(b => b === 1) || col.every(b => b === 2))
  if (winner.length) return winner[0][0]
  if ((
    (game.field[0][0] === 1 && game.field[1][1] === 1 && game.field[2][2] === 1) ||
      (game.field[0][0] === 2 && game.field[1][1] === 2 && game.field[2][2] === 2)
  ) ||
    (
      (game.field[2][0] === 1 && game.field[1][1] === 1 && game.field[0][2] === 1) ||
      (game.field[2][0] === 2 && game.field[1][1] === 2 && game.field[0][2] === 2)
    )) return game.field[1][1]
  return null
}

schema.methods.checkEnd = function() {
  const winner = findSequence(this)
  if (!winner && !_.flatten(this.field).some(b => !b)) return 'draw'
  return winner
}

const gameResults = {
  1: 'Client',
  2: 'AI'
}

schema.methods.endGame = async function() {
  const result = this.checkEnd()
  this.winner = gameResults[result] || result
  await this.save()
  return this
}

schema.statics.findLastUsersGames = async function({ userId, limit = 15, offset = 0 }) {
  return this.find({ userId }).sort({ date: -1 }).limit(limit).skip(offset)
}

const Game = mongoose.model('Game', schema)
export default Game

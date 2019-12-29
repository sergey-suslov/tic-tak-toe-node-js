import cookie from 'cookie'
import util from 'util'
import jsonwebtoken from 'jsonwebtoken'
import config from 'config'
import { calculateTurn } from '../AI'
import db from '../db'

const getSocketUserId = async socket => {
  if (!socket.handshake.headers.cookie) return undefined
  const { token } = cookie.parse(socket.handshake.headers.cookie)
  let userId
  if (token) {
    const decodeJWT = util.promisify(jsonwebtoken.verify)
    const decoded = await decodeJWT(token, process.env.JWT_SECRET || config.jwt.secret)
    if (new Date(new Date(decoded.created).getTime() + decoded.lifetime) > new Date()) {
      userId = decoded._id
    }
  }
  return userId
}

const endGame = async(game, socket) => {
  await game.endGame()
  socket.emit('game-ended', game.toJSON())
}

export default io => {
  io.on('connect', async socket => {
    socket.on('init-game', async () => {
      const userId = await getSocketUserId(socket)
      const game = await db.model('Game').initNewGame(userId)
      socket.emit('init-game', game && game.toJSON())
    })

    socket.on('make-turn', async({ row, col, gameId }) => {
      const game = await db.model('Game').findById(gameId)
      if (!game) return
      if (game.checkEnd()) return endGame(game, socket)

      // Performing client turn
      await game.makeTurn(row, col)
      socket.emit('turn-made', game.toJSON())
      if (game.checkEnd()) return endGame(game, socket)

      // Performing AI turn
      const aiTurn = calculateTurn(game.field)
      if (!aiTurn) return
      await game.makeTurn(aiTurn.row, aiTurn.col, 2)
      socket.emit('turn-made', game.toJSON())
      if (game.checkEnd()) return endGame(game, socket)
    })
  })
}

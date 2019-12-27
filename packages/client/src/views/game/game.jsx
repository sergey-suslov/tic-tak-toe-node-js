import React, {useState} from 'react'
import {Spin, Typography} from 'antd'
import _ from 'lodash'
import shortid from 'shortid'
import io from 'socket.io-client'
import {
  useStateConnected,
  useStateGameCreated,
  useStateGameUpdated
} from './hooks'
import Box from './box'
import './game.less'

function makeTurn(row, col, game, setGame, socket) {
  if (socket.disconnected || !game || game && game.field[row][col]) return
  const updatedGame = {
    ...game
  }
  updatedGame.field[row][col] = 1

  setGame(updatedGame)
  socket.emit('make-turn', {row, col, gameId: game._id})
}

let socket

export default function () {
  if (!socket) {
    socket = io({
      path: '/socket.io',
      transports: ['polling', 'websocket']
    })
  }

  const connected = useStateConnected(socket)

  let [game, setGame] = useState({field: [[0,0,0], [0,0,0], [0,0,0]]})
  game = useStateGameCreated(game, setGame, socket, game._id)

  useStateGameUpdated(socket, setGame)

  const clientTurn = _
    .chain(game.field)
    .flatten()
    .filter(b => b)
    .value()
    .length % 2 === 0

  return (
    <Spin spinning={!connected || !game} tip={!connected ? 'Connecting...' : 'Creating a game...'}>
      <Spin spinning={!clientTurn && (!game || !game.winner)} delay={300} tip="Server computer turn...">
        <div className="game-field">
          {_.flatten(game.field)
            .map((b, i) => (
              <Box
                key={shortid.generate()}
                value={b}
                onClick={() => !game.winner && makeTurn(Math.floor(i / 3), i % 3, game, setGame, socket)}
              />
            ))}
        </div>
        <Typography className="winner-text">
          Winner: {game && game.winner ? game.winner : '...'}
        </Typography>
      </Spin>
    </Spin>
  )
}

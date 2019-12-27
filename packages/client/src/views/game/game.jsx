import React, {useState} from 'react'
import {Spin, Typography} from 'antd'
import _ from 'lodash'
import shortid from 'shortid'
import {
  useStateConnected,
  useStateGameCreated,
  useStateGameUpdated
} from './hooks'
import DefaultButton from '../../widgets/buttons/default-button'
import Box from './box'
import './game.less'
import SocketProvider from './SocketProvider'

function makeTurn(row, col, game, setGame, socket) {
  if (socket.disconnected || !game || game && game.field[row][col]) return
  const updatedGame = {
    ...game
  }
  updatedGame.field[row][col] = 1

  setGame(updatedGame)
  socket.emit('make-turn', {row, col, gameId: game._id})
}

function Game({socket}) {
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
        <Typography className="text-align-center">
          Winner: {game && game.winner ? game.winner : '...'}
        </Typography>
        {game && game.winner ? <div className="text-align-center">
          <DefaultButton onClick={() => setGame(
            {field: [[0,0,0], [0,0,0], [0,0,0]]}
          )}>Play again</DefaultButton>
        </div> : null}
      </Spin>
    </Spin>
  )
}

export default props => <SocketProvider Component={Game} {...props} />

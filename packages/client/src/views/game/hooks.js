import {useEffect, useState} from 'react'

export function useStateConnected(socket) {
  const [connected, setConnected] = useState(socket.connected)

  function onConnect() {
    setConnected(true)
  }
  function onDisconnect() {
    setConnected(false)
  }

  useEffect(() => {
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  })
  return connected
}

export function useStateGameCreated(game, setGame, socket) {
  if (socket.connected && (!game || !game._id)) {
    socket.emit('init-game')
  }

  function onGameInited(game) {
    setGame(game)
  }
  useEffect(() => {
    socket.on('init-game', onGameInited)

    return () => {
      socket.off('init-game', onGameInited)
    }
  })

  return game
}

export function useStateGameUpdated(socket, setGame) {
  function onGameChanged(game) {
    setGame(game)
  }

  useEffect(() => {
    socket.on('turn-made', onGameChanged)
    socket.on('game-ended', onGameChanged)

    return () => {
      socket.off('turn-made', onGameChanged)
      socket.off('game-ended', onGameChanged)
    }
  })
}

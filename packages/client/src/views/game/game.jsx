import React, {useEffect, useState} from 'react'
import {Spin} from 'antd'
import socket from '../../socket'
import Box from './box'
import './game.less'

const boxes = [0,1,2,3,4,5,6,7,8]

function useStateConnected(socket) {
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

export default function () {
  const connected = useStateConnected(socket)
  return (
    <Spin spinning={!connected}>
      <div className="game-field">
        {boxes.map(b => <Box key={b} />)}
      </div>
    </Spin>
  )
}

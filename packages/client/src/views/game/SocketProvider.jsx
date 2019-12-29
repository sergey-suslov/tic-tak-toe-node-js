import React, {Component} from 'react'
import io from 'socket.io-client'

class SocketProvider extends Component {
  constructor(props) {
    super(props)
    this.socket = io({
      path: '/socket.io',
      transports: ['polling', 'websocket']
    })
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close()
    }
  }

  render() {
    const {Component} = this.props
    return (
      <Component socket={this.socket} {...this.props} />
    )
  }
}

export default SocketProvider

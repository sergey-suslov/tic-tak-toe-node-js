import React, {Component, Fragment} from 'react'
import DefaultButton from '../../../widgets/buttons/default-button'
import HistoryCard from './history-card'
import './history.less'
import {Spin} from 'antd'

export default class History extends Component{
  state
  componentDidMount() {
    this.props.getHistory()
  }

  componentWillUnmount() {
    this.props.clearHistory()
  }

  render() {
    const {history, isGettingHistory, hasMore, getHistory} = this.props
    console.log('Hi', history)
    return (
      <Fragment>
        <Spin spinning={isGettingHistory} delay={300}>
          <div className="history-root">
            {history.map(h => <HistoryCard key={h._id} history={h} />)}
          </div>
          <br />
          {hasMore && <DefaultButton onClick={getHistory}>
            Load more
          </DefaultButton>}
        </Spin>
      </Fragment>
    )
  }
}

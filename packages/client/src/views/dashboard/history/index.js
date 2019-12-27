import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import History from './history'
import {getHistory, clearHistory} from '../../../actions/user-actions'
import {isGettingHistory, history, hasMoreHistory} from '../../../reducers/user-reducer'

const mapStateToProps = state => ({
  isGettingHistory: isGettingHistory(state),
  hasMore: hasMoreHistory(state),
  history: history(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getHistory,
    clearHistory
  },
  dispatch
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(History))

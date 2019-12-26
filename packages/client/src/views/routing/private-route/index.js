import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { isSignedIn } from '../../../reducers/user-reducer'
import PrivateRoute from './private-route'

const mapStateToProps = state => ({
  isSignedIn: isSignedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute))

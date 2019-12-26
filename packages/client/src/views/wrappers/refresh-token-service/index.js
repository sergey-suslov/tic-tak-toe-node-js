import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { isSignedIn } from '../../../reducers/user-reducer'
import { setUserSignedIn, refreshToken } from '../../../actions/user-actions'
import RefreshTokenService from './refresh-token-service'

const mapStateToProps = state => ({
  isSignedIn: isSignedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setUserSignedIn,
    refreshToken
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(RefreshTokenService))

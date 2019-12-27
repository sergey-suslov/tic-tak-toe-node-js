import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { signIn } from '../../../actions/user-actions'
import { isSignedIn, isSigningIn } from '../../../reducers/user-reducer'

import SignInForm from './sign-in-form'

const mapStateToProps = state => ({
  isSignedIn: isSignedIn(state),
  isSigningIn: isSigningIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signIn
  },
  dispatch
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm))

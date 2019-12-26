import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { signUp } from '../../../actions/user-actions'
import { isSignedUp, isSigningUp } from '../../../reducers/user-reducer'

import SignUpForm from './sign-up-form'

const mapStateToProps = state => ({
  isSignedUp: isSignedUp(state),
  isSigningUp: isSigningUp(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signUp
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm))

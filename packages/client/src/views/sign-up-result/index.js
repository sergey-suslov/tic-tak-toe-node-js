import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SignUpResult from './sign-up-result'

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpResult))

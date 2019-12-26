import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ServerIsUnavailable from './500'

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServerIsUnavailable))

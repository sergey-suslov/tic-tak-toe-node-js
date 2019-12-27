import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Dashboard from './dashboard'

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
)(Dashboard))

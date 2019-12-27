import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { profile } from '../../../reducers/user-reducer'
import { getProfile } from '../../../actions/user-actions'
import UserProfileService from './user-profile-service'

const mapStateToProps = state => ({
  profile: profile(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getProfile
  },
  dispatch
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileService))

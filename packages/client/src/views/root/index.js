// material-ui
import { withStyles } from '@material-ui/core/styles'

import Root from './root'

const styles = () => ({
  // root: {
  //   display: 'flex',
  //   flexGrow: 1,
  // },
})

export default withStyles(styles, { withTheme: true })(Root)

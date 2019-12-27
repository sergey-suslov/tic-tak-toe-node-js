import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import history from '../services/history'
import userReducer, { moduleName as user } from './user-reducer'

export default {
  router: connectRouter(history),
  form,
  [user]: userReducer
}

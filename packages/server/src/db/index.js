import mongoose from 'mongoose'
import config from 'config'
import './models/User'
import './models/UserRegistration'
import './models/Session'
import './models/Game'

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME || config.db.name}`, {
  useNewUrlParser: true,
  dbName: process.env.DB_NAME || config.db.name,
  user: process.env.USER_NAME || config.db.userName,
  pass: process.env.USER_PASSWORD || config.db.userPassword
})
mongoose.set('useCreateIndex', true)

export default mongoose

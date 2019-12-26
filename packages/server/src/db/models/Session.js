import mongoose from 'mongoose'
import { generateSid } from '../../util/crypto'
import config from 'config'

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sid: { type: String, required: false },
  expire: { type: Date, required: true },
  refreshExpire: { type: Date, required: true },
  date: { type: Date, default: Date.now }
})

schema.statics.createSessionForUser = async function(userId) {
  const sid = generateSid()
  const date = new Date()
  const expire = new Date(date.getTime() + config.session.lifetime)
  const refreshExpire = new Date(date.getTime() + config.session.lifetimeRefresh)
  const session = await this.create({
    userId,
    sid,
    date,
    expire,
    refreshExpire
  })
  return session
}

schema.statics.isRefreshExpired = async function(incomeSid, userId) {
  const session = await this.findOne({
    userId,
    sid: incomeSid
  })
  if (!session || new Date(session.refreshExpire).getTime() < new Date().getTime()) {
    return true
  }
  return false
}
schema.statics.updateSession = async function(incomeSid, userId) {
  await this.deleteOne({
    userId,
    sid: incomeSid
  })
  const session = await this.createSessionForUser(userId)

  return session
}

const Session = mongoose.model('Session', schema)
export default Session

import mongoose from 'mongoose'
import Boom from 'boom'
import { generateHash } from '../../util/crypto'

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  hash: { type: String, required: true },
  confirmHash: { type: String, required: true },
  salt: { type: String, required: true },
  date: { type: Date, default: Date.now },
  emailSent: { type: Date }
})

schema.statics.registerByEmail = async function(email, password) {
  const { hash, salt } = generateHash(password)
  const { hash: confirmHash } = generateHash(password + Date.now())
  const userRegistration = await this.create({
    email,
    hash,
    salt,
    confirmHash
  })
  return userRegistration
}

schema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    // TODO: send confirmation email again
    next(
      Boom.badRequest('User already registered, but have not confermed yet. Please, check your inbox for a confirmation email', {
        duplicate: ['email']
      })
    )
  } else {
    next()
  }
})

schema.index({ confirmHash: 1 })

const UserRegistration = mongoose.model('UserRegistration', schema)
export default UserRegistration

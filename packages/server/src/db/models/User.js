import mongoose from 'mongoose'
import Boom from 'boom'
import { generateHash, compareHashes } from '../../util/crypto'

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  blocked: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
})

schema.statics.registerByEmail = async function(email, password) {
  const { hash, salt } = generateHash(password)
  const user = await this.create({
    email,
    hash,
    salt
  })
  return user
}

schema.statics.registerConfirm = async function({ email, phone, hash, salt }) {
  const createdUser = await this.findOne({ email })
  if (createdUser) return createdUser
  const user = await this.create({ email, phone, hash, salt })
  return user
}

schema.statics.getByEmailAndPassword = async function(email, password) {
  const user = await this.findOne({ email })
  if (!user) return null
  const isPasswordValid = compareHashes(password, user.hash, user.salt)
  return isPasswordValid ? user : null
}

schema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(
      Boom.badRequest('User with given email already exists', {
        duplicate: ['email']
      })
    )
  } else {
    next()
  }
})

schema.index({ email: 1 })

const User = mongoose.model('User', schema)
export default User

import _ from 'lodash'
import Boom from 'boom'
import Joi from 'joi'
import config from 'config'
import jsonwebtoken from 'jsonwebtoken'

const validateSignInUp = async(ctx, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().max(250).required(),
    password: Joi.string().min(4).max(250).required()
  })
  if (Joi.validate({ email: ctx.request.body.email, password: ctx.request.body.password }, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}

const signIn = async ctx => {
  const User = ctx.db.model('User')
  const Session = ctx.db.model('Session')
  const user = await User.getByEmailAndPassword(ctx.request.body.email, ctx.request.body.password)
  if (!user) throw Boom.badRequest('Wrong email or password')
  const session = await Session.createSessionForUser(user._id)
  const token = jsonwebtoken.sign({
    ..._.pick(user, ['_id', 'email']),
    created: new Date(),
    sid: session.sid,
    lifetime: config.jwt.lifetime
  }, process.env.JWT_SECRET || config.jwt.secret)
  const refreshToken = jsonwebtoken.sign({
    sid: session.sid,
    expire: session.expire
  }, process.env.JWT_SECRET || config.jwt.secret)
  ctx.cookies.set('token', token, { signed: true })
  ctx.body = {
    refreshToken,
    expire: session.expire
  }
}

export default {
  validateSignInUp,
  signIn
}

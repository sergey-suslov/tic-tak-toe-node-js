import config from 'config'
import Boom from 'boom'
import util from 'util'
import Joi from 'joi'
import jsonwebtoken from 'jsonwebtoken'

const validateRefresh = async(ctx, next) => {
  const schema = Joi.object().keys({
    token: Joi.string().max(2000).required()
  })
  if (Joi.validate({ token: ctx.request.body.token }, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }

  const { sid, _id } = ctx.state.user
  const refreshToken = ctx.request.body.token
  const decodeJWT = util.promisify(jsonwebtoken.verify)
  const decoded = await decodeJWT(refreshToken, process.env.JWT_SECRET || config.jwt.secret)
  if (sid !== decoded.sid) {
    return ctx.throw(Boom.unauthorized('Token sid does not equal refresh sid'))
  }

  const isRefreshExpired = await ctx.db.model('Session').isRefreshExpired(decoded.sid, _id)
  if (isRefreshExpired) {
    return ctx.throw(Boom.unauthorized('Sorry, but last session lifetime is over. Please sign in.'))
  }
  await next()
}

const refresh = async ctx => {
  const { sid, _id, email } = ctx.state.user
  const Session = ctx.db.model('Session')
  const session = await Session.updateSession(sid, _id)
  const token = jsonwebtoken.sign({
    _id,
    email,
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
  validateRefresh,
  refresh
}

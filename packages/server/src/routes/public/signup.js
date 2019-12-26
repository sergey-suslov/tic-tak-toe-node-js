import Boom from 'boom'
import Joi from 'joi'

const validateConfirmRegistration = async(ctx, next) => {
  const schema = Joi.object().keys({
    confirmHash: Joi.string().max(500).required()
  })
  if (Joi.validate({ confirmHash: ctx.request.body.confirmHash }, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}

const signUp = async ctx => {
  const UserRegistration = ctx.db.model('UserRegistration')
  const userRegistration = await UserRegistration.registerByEmail(ctx.request.body.email, ctx.request.body.password)

  // Here should be email confirmation. Confirm manualy
  const { email, phone, hash, salt } = userRegistration
  await ctx.db.model('User').registerConfirm({ email, phone, hash, salt })
  await userRegistration.delete()

  ctx.body = ''
}

const confirmRegistration = async ctx => {
  const { confirmHash } = ctx.request.body
  const userRegistration = await ctx.db.model('UserRegistration').findOne({ confirmHash })
  if (!userRegistration) {
    throw Boom.badRequest('Invalid link')
  }
  const { email, phone, hash, salt } = userRegistration
  await ctx.db.model('User').registerConfirm({ email, phone, hash, salt })
  await userRegistration.delete()
  ctx.body = ''
}

export default {
  signUp,
  validateConfirmRegistration,
  confirmRegistration
}

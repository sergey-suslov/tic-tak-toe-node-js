import Router from 'koa-router'
import signup from './signup'
import signin from './signin'

const router = new Router()
router.prefix('/public')

router.post('/signup/email', signin.validateSignInUp, signup.signUp)
router.post('/signup/email/confirm', signup.validateConfirmRegistration, signup.confirmRegistration)

router.post('/signin/email', signin.validateSignInUp, signin.signIn)

export default router

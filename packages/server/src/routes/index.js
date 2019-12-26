import Router from 'koa-router'
import publicApi from './public'
import privateApi from './api'

const router = new Router()
router.use(publicApi.routes(), publicApi.allowedMethods())
router.use(privateApi.routes(), privateApi.allowedMethods())

export default router

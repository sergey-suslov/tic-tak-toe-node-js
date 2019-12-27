import Router from 'koa-router'
import profile from './profile'
import refresh from './refresh'
import history from './history'

const router = new Router()
router.prefix('/user')

router.get('/profile', profile.profile)
router.post('/refresh', refresh.validateRefresh, refresh.refresh)
router.get('/history', history.get)

export default router

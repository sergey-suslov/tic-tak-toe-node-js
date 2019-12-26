import Koa from 'koa'
import koaBody from 'koa-body'
import session from 'koa-session'
import koaJWT from 'koa-jwt'
import config from 'config'
import logger from './logger'
import db from './db'
import errorHandler from './middlewares/error-handler'
import logRequest from './middlewares/log-request'
import formatInput from './middlewares/format-input'
import routes from './routes'

const app = new Koa()
app.context.log = logger
app.context.db = db

app.keys = [process.env.SESSION_SECRET]

const CONFIG = {
  maxAge: 86400000
}

app.use(session(CONFIG, app))
app.use(koaBody({ multipart: true }))
app.use(errorHandler)
app.use(koaJWT({
  secret: process.env.JWT_SECRET || config.jwt.secret,
  getToken: ctx => ctx.cookies.get('token'),
  isRevoked: async(ctx, decodedToken) => new Date(new Date(decodedToken.created).getTime() + decodedToken.lifetime) < new Date()
}).unless({ path: [/^\/public/] }))
app.use(logRequest)
app.use(formatInput)
app.use(routes.routes(), routes.allowedMethods())
app.on('error', () => {})

app.listen(process.env.PORT || 8080)

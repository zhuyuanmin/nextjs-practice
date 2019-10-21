const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const auth = require('./auth')
const api = require('./api')

const { RedisSessionStore } = require('./session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const hanlde = app.getRequestHandler()

const redis = new Redis({
  port: 6378,
  host: '127.0.0.1',
  password: '123456'
})

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.keys = ['Welcome all developer to GET owner App']
  const SESSION_CONFIG = {
    key: 'jid',
    maxAge: 10 * 60 * 1000,
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))
  // 处理auth
  auth(server)
  api(server)

  server.use(router.routes()) // 注意此处需要优先加载路由

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await hanlde(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})
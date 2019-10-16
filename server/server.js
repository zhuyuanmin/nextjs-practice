const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const auth = require('./auth')

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

  server.use(async (ctx, next) => {
    // if (!ctx.session.user) {
    //   ctx.session.user = {
    //     username: 'Jokcy',
    //     age: 18
    //   }
    // } else {
      console.log('session is:', ctx.session)
    // }
    await next()
  })

  router.get('/api/userInfo', async ctx => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {
      ctx.set('Content-Type', 'appliction/json')
      ctx.body = user
    }
  })

  router.get('/home/index/:id', async ctx => {
    const id = ctx.params.id
    await hanlde(ctx.req, ctx.res, {
      pathname: '/home/index',
      query: { id }
    })
    ctx.respond = false
  })

  // router.get('/test/:id', ctx => {
  //   // ctx.body = `<p>request /test ${ctx.params.id}</p>`
  //   ctx.body = { success: true }
  //   ctx.set('Content-type', 'application/json')
  // })
  server.use(router.routes()) // 注意此处需要优先加载路由

  server.use(async (ctx, next) => {
    await hanlde(ctx.req, ctx.res)
    ctx.respond = false
    next()
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})
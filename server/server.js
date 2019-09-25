const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const hanlde = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

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
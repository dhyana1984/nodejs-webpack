const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

const router = new Router()
//带有前缀的路由
const prefixRouter = new Router({ prefix: '/user' })

//日志中间件
logger = async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.path} ${ctx.headers['user-agent']}`)
  await next()
}

//路由定义
router.get('/', async (ctx) => {
  ctx.body = 'This is a Koa router'
})
router.get('/user', async (ctx) => {
  ctx.body = 'user'
})

//带前缀路由
//此时需要用/user/prefixRouter访问，用/prefixRouter访问不到
prefixRouter.get('/prefixRouter', (ctx) => {
  ctx.body = '/user/prefixRouter'
})

//只针对路由的中间件
//路由的第二个参数用来放中间件
router.get('/routerMidware', logger, (ctx) => {
  ctx.body = 'run router middleware'
})

//路由函数
router.get(
  '/routerFunction',
  async (ctx, next) => {
    ctx.state.data = { logged: true }
    await next()
  },
  (ctx) => {
    ctx.body = ctx.state.data
  }
)

//挂载路由中间件, 必须挂载，否则不会生效
app.use(router.routes())
app.use(router.allowedMethods())
//直接使用链式函数挂载
app.use(prefixRouter.routes()).use(prefixRouter.allowedMethods())

app.listen(10000, () => {
  console.log('listen on 10000')
})

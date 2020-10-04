const Koa = require('koa')
const logger = require('./request-logger-middleware')
const cookieParser = require('./cookie-parser')

const app = new Koa()

//Koa的中间件是一个洋葱模型
//middleware1 start
//middleware2 start
//router
//middleware2 end
//middleware1 end
middleware1 = async (ctx, next) => {
  console.log('middleware1 start')
  await next()
  console.log('midlleware1 end')
}

middleware2 = async (ctx, next) => {
  console.log('middleware2 start')
  await next()
  console.log('midlleware2 end')
}

//错误处理中间件
errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.status = e.status || 500
    ctx.body = `System Error: ${e.message}`
  }
}

//错误日志记录中间件
errorLogger = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    console.log(`${ctx.method} ${ctx.path} Error: ${e.message}`)
    throw e //继续抛出错误，这样外层的error handler才能捕获该错误
  }
}
app.use(errorHandler) //先挂载错误响应中间件
app.use(errorLogger) //再挂载错误日志中间件
app.use(logger)
app.use(cookieParser)
// app.use(middleware1)
// app.use(middleware2)

// app.use(async (ctx) => {
//   console.log('router')
//   //这里读到的cookie是在cookieParser里面存到ctx.state的cookie
//   ctx.body = ctx.state.cookies
// })

app.use((ctx) => {
  ctx.throw(403, 'Forbidden')
})

app.listen(10000, () => {
  console.log('listen on 10000')
})

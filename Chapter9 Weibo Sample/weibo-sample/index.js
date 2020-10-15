const Koa = require('koa')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')
const statickMiddleware = require('koa-static')
const errorHandler = require('./middlewares/errorHandler')
const authenticate = require('./middlewares/authenticate')
const homeRoute = require('./routers/home')
const userRoute = require('./routers/user')
const weiboRoute = require('./routers/weibo')
const commentRoute = require('./routers/comment')

const app = new Koa({
  keys: ['KGJ6NLxqOkYCNr1h']
})

app.use(errorHandler)
render(app, {
  root: './templates',
  layout: 'layout',
  viewExt: 'ejs'
})

app.use(statickMiddleware(__dirname + '/public'))
app.use(bodyParser())
app.use(authenticate)

//路由
app.use(homeRoute.routes()).use(homeRoute.allowedMethods())
app.use(userRoute.routes()).use(userRoute.allowedMethods())
app.use(weiboRoute.routes()).use(weiboRoute.allowedMethods())
app.use(commentRoute.routes()).use(commentRoute.allowedMethods())

app.listen(10000, () => {
  console.log('listen on 10000')
})

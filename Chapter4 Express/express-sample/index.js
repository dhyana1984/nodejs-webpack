import Express from 'express'
import userRouter from './user'
import reqRouter from './request'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import myCookieParser from './cookie-middleware'

//创建应用
const app = Express()

//设置app的渲染模板，配置模板类型
app.set('views', './template')
app.set('view engine', 'ejs')

//使用cookie-parser中间件，以cookieParser()函数调用
// app.use(cookieParser())

//使用自定义的cookie中间件
app.use(myCookieParser())

app.get('/templatetest', (req, resp) => {
  const users = [
    { id: 1, name: 'Jack' },
    { id: 2, name: 'Kelly' }
  ]
  resp.render('site/index', {
    users,
    show: !!req.query.show
  })
})

//使用body-parser中间件，解析req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/cookietest', (req, resp) => {
  resp.send(req.cookies)
})

//这是一个简单的输出request信息的中间件，实际上就是一个函数
// function logger(req, resp, next) {
//   console.log(`${req.method} ${req.path} "${req.headers['user-agent']}"`)
//   //需要执行next
//   next()
// }

//支持配置的中间件，通过options参数来控制输出的内容
function logger(options) {
  //返回一个真正的中间件
  return function (req, resp, next) {
    const logs = []
    if (options.method) {
      logs.push(req.method)
    }
    if (options.path) {
      logs.push(req.path)
    }
    if (options['user-agent']) {
      logs.push(req.headers['user-agent'])
    }
    console.log(logs.join(' '))
    next()
  }
}

//直接用app.use调用中间件，是全局中间件，对所有请求有效
// app.use(logger)

//可配置的全局logger中间件
app.use(logger({ method: true, path: true }))

//在路由中加入中间件，就只对该路由有效
// app.get('/midware', logger, (req, resp) => {
//   resp.send('midware')
// })

//设置路由
app.get('/', (req, resp) => {
  //输出响应
  // resp.json(req.headers)
  resp.send('主页')
})

//配置参数
//:accountid(\\d+)限定参数是数字，如果accountid不是数数字会报错找不到路由
app.get('/params/:userid/accountid/:accountid(\\d+)', (req, resp) => {
  //输出响应
  // resp.json(req.headers)
  resp.send(req.params)
})

//路由函数
//同一个路由，可以定义多个路由函数来处理，每个路由函数做一件事情
//一个路由函数结束需要调用next()，只要不调用就不会进入下一个路由函数
app.get(
  '/routerFunction1',
  (req, resp, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  },
  (req, resp) => {
    resp.send('router function1')
  }
)

//直接传入两个路由方法，注意第一个要调用next()
app.get('/routerFunction2', [routerFunc1, routerFunc2])

function routerFunc1(req, resp, next) {
  console.log(`${req.method} ${req.path}`)
  next()
}

function routerFunc2(req, resp) {
  resp.send('router function2')
}

//同一个路由,get和post的处理方式，使用app.route()
app
  .route('/user/info')
  .get((req, resp) => {
    resp.send('user info page')
  })
  .post((req, resp) => {
    resp.send('submit user info')
  })

//使用从user.js导入的模块化路由，用app.use()
app.use('/user', userRouter)

app.use('/', reqRouter)

//开启监听
app.listen(8080, () => {
  console.log('listen on 8080')
})

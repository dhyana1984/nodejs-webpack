import Express from 'express'
import userRouter from './user'
import reqRouter from './request'
//创建应用
const app = Express()

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

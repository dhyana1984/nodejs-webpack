import Express from 'express'

//创建应用
const app = Express()

//设置路由
app.get('/', (req, resp) => {
  //输出响应
  resp.json(req.headers)
})

//开启监听
app.listen(8080, () => {
  console.log('listen on 8080')
})

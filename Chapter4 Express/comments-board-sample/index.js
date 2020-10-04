const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//设置模板引擎
app.set('view engine', 'ejs')
app.set('views', './templates')
//请求解析中间件配置
//使用body-parser中间件，解析req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//留言内容
const message = []

//首页路径
app.get('/', (req, resp) => {
  resp.render('index', { message })
})

//留言页路径
app
  .route('/publish')
  .get((req, resp) => {
    resp.render('publish')
  })
  .post((req, resp) => {
    if (!req.body.name || !req.body.content) {
      throw new Error('Please complete all fields!')
    }
    const now = new Date().toLocaleString()
    message.push({
      name: req.body.name,
      content: req.body.content,
      time: now
    })

    resp.redirect('/')
  })

app.listen(8080, () => {
  console.log('listen on 8080')
})

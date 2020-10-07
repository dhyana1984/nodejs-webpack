//用户相关路由，负责登录和退出
const Router = require('koa-router')
const userService = require('../service/user')
const router = new Router()

//登录表单
router.get('/login', async (ctx) => {
  await ctx.render('login')
})

//登录处理
router.post('/login', async (ctx) => {
  const data = ctx.request.body
  if (!data.username || !data.password) {
    ctx.throw(400, 'Your request is invailid')
  }

  const logged = userService.login(data.username, data.password)
  if (!logged) {
    ctx.throw(400, 'Credential error')
  }
  ctx.cookies.set('logged', 1, {
    signed: true,
    httpOnly: true
  })
  ctx.redirect('/', 'Login successfully')
})

//退出登录
router.get('/logout', (ctx) => {
  ctx.cookies.set('logged', 0, {
    maxAge: -1,
    signed: true
  })
  ctx.redirect('/', 'Logout successfully')
})
module.exports = router

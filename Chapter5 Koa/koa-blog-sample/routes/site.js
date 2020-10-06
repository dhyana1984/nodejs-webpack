//网站首页，负责读取文章列表并渲染到hml
const Router = require('koa-router')
const postService = require('../service/post')

const router = new Router()

//网站首页
router.get('/', async (ctx) => {
  const list = postService.list()
  await ctx.render('index', {
    list
  })
})

module.exports = router

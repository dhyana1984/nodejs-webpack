//广场

const Router = require('koa-router')
const router = new Router()
const weiboService = require('../service/weiboService')

router.get('/', async (ctx) => {
  let { page = 1, size = 10 } = ctx.query
  page = Number(page)
  size = Number(size)
  //weiboService.list 是调用了Weibo.findAndCountAll，返回rows和count
  const { rows, count } = await weiboService.list(page, size)
  await ctx.render('home', {
    list: rows,
    count,
    page,
    size
  })
})

module.exports = router

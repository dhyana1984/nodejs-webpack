ctx.redirect('back') //返回上一页

const Router = require('koa-router')
const commentService = require('../service/comment')
const guard = require('../middlewares/guard')

const router = new Router({ prefix: '/comment' })

router.get('/delete/:id', guard, async (ctx) => {
  const userId = ctx.state.userId
  await commentService.destroy(ctx.params.id, userId)
  await ctx.redirect('back')
})

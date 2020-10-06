//文章相关路由，负责文章发布，编辑，删除
const Router = require('koa-router')
const postService = require('../service/post')
const router = new Router()

//发布表单页
router.get('/publish', async (ctx) => {
  await ctx.render('publish')
})

//发布处理
router.post('./publish', async (ctx) => {
  //获取post的参数
  const data = ctx.request.body
  if (!data.title || !data.content) {
    ctx.throw(400, 'Bad request!')
  }
  //发表同时返回刚刚发表的文章
  const item = postService.publish(data.title, data.content)
  ctx.redirect(`/post/${item.id}`)
})

//详情页
router.get('/post/:postId', async (ctx) => {
  const post = postService.show(ctx.params.postId)
  if (!post) {
    ctx.throw(404, 'No content')
  }
  await ctx.render('post', {
    post
  })

  //编辑表单页
  router.get('/update/:postId', async (ctx) => {
    const post = postService.show(ctx.params.postId)
    if (!post) {
      ctx.throw(404, 'No content')
    }
    await ctx.render('update', {
      post
    })
  })

  //编辑处理
  router.post('/update/:postId', async (ctx) => {
    const data = ctx.request.body
    if (!data.title || !data.content) {
      ctx.throw(400, 'You request is invalid')
    }
    const postId = ctx.params.postId
    postService.update(postId, data.title, data.content)
    ctx.redirect(`/post/${postId}`)
  })

  //删除
  router.get('/delete/:postId', async (ctx) => {
    postService.delete(ctx.params.postId)
    ctx.redirect('/')
  })
})

module.exports = router

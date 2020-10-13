//限制登录
module.exports = async (ctx, next) => {
  if (!ctx.state.userId) {
    await ctx.require('/user/login')
    return
  }
  await next()
}

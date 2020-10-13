//鉴权
module.exports = async (ctx, next) => {
  ctx.state.userId = Number(ctx.cookies.get('userId', { signed: true }))
  await next()
}

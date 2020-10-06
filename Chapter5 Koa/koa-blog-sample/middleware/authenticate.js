//authentication middleware
module.exports = async (ctx, next) => {
  const logged = ctx.cookies.get('logged', { signed: true })
  ctx.state.logged = !!logged
  await next()
}

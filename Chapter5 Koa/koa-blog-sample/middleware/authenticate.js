//authentication middleware
module.exports = async (ctx, next) => {
  const logged = ctx.cookies.get('logged', { signed: true })
  ctx.state.logged = !!logged
  console.log('logged:' + logged)
  await next()
}

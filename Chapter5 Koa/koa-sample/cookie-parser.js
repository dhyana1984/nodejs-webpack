cookieParser = async (ctx, next) => {
  const headerCookie = ctx.headers.cookie
  ctx.state.cookies = {}
  if (headerCookie) {
    const cookies = headerCookie.split(';')
    cookies.forEach((cookie) => {
      const parts = cookie.split('=')
      //将解析到的cookie挂载到ctx.state.cookies
      ctx.state.cookies[parts[0]] = parts[1]
    })
  }
  await next()
}

module.exports = cookieParser

//自己定义一个cookie中间件解析cookie
export default function cookieParser() {
  return function (req, resp, next) {
    req.cookies = {}
    //获取请求的header
    const headerCookie = req.headers.cookie
    if (headerCookie) {
      const cookies = headerCookie.split(';')
      cookies.forEach((cookie) => {
        const pairs = cookie.split('=')
        //将解析到的cookie挂载到req.cookies对象
        req.cookies[pairs[0]] = pairs[1]
      })
    }
    next()
  }
}

const Koa = require('koa')

//实例化应用
const app = new Koa()

//中间件
// app.use(async (ctx) => {
//   ctx.body = 'Hello World!'
// })

//Cookie签名密钥，最好使用随机字符串
app.keys = ['mykyes']
app.proxy = true
app.use(async (ctx, next) => {
  ctx.set('X-version', '1.0.0')
  //设置cookie
  //此时客户端会有两个cookie，一个叫做logged，一个叫做logged.sig
  //logged.sig用来签名的cookie,服务端读取logged时，同时读取logged.sig，如果签名不匹配，则读取到的cookie值为undefined
  ctx.cookies.set('logged', 'This is the logged cookie', {
    signed: true,
    httpOnly: true,
    maxAge: 3600 * 24 * 1000
  })
  //响应内容
  ctx.body = {
    status: ctx.status,
    method: ctx.method,
    path: ctx.path,
    url: ctx.url,
    query: ctx.query,
    headers: ctx.headers,
    ip: ctx.ip,
    //建议传递signed选项来验证签名否则cookie有篡改风险
    logged: ctx.cookies.get('logged', { signed: true })
  }
  //需要用await next()交给下面一个中间件处理
  await next()
})

//监听
app.listen(10000, () => {
  console.log('listen on 10000')
})

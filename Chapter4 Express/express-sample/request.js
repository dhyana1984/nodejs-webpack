import Express from 'express'

const reqRouter = Express.Router()

reqRouter.get('/request/:userId', getRouteFunc)

function getRouteFunc(req, resp) {
  resp.json({
    method: req.method,
    params: req.params, //这里只显示userId的值
    path: req.path,
    url: req.url,
    query: req.query, //这里会显示url里面?后的query值
    headers: req.headers, //express默认是不会解析cookieDe，在header里面的cookie不会被解析
    cookies: req.cookies, //使用cookie-parser会解析cookie
    ip: req.ip || req.ips
  })
}

reqRouter.post('/request', postRouteFunc)

function postRouteFunc(req, resp) {
  //通过cookie-parser中间件可以解析body
  resp.json(req.body)
}
export default reqRouter

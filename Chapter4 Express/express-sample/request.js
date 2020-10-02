import Express from 'express'

const reqRouter = Express.Router()

reqRouter.get('/request/:userId', routeFunc)

function routeFunc(req, resp) {
  resp.json({
    method: req.method,
    params: req.params, //这里只显示userId的值
    path: req.path,
    url: req.url,
    query: req.query, //这里会显示url里面?后的query值
    headers: req.headers,
    cookies: req.cookies,
    ip: req.ip || req.ips
  })
}
export default reqRouter

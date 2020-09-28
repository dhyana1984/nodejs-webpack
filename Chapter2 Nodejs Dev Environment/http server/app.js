const http = require('http')

const hostname = '127.0.0.1' //监听地址
const port = 3000 //监听端口

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end(`Hello World\n`) //输出内容并结束本次响应
})
//运行服务
server.listen(port, hostname, () => {
  //在运行的console里输出内容，不是在浏览器的console
  console.log(`Server running at http://${hostname}:${port}`)
})

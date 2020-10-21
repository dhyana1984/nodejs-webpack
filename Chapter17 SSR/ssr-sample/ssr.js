const express = require('express')
const { render } = require('./build/ssr.bundle')

const app = express()
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
        <meta charset="UTF-8">
        <title>SSR</title>
    </head>
    <body>
        <div id="app">${render()}</div>
        <script src="./build/bundle.js"></script>
    </body>
    </html>
    `)
})

app.use(express.static('.')) //将当前目录作为HTTP服务器文档根目录
app.listen(3000, () => {
  console.log('app listen on 3000')
})

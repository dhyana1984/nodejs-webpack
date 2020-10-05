const Koa = require('koa')
const render = require('koa-ejs')
const app = new Koa()
render(app, {
  //使用ejs中间件
  root: './templates', //设置模板目录
  layout: 'main', //false是关闭模板布局，main是指定模板布局是main.ejs
  viewExt: 'ejs'
})

app.use(async (ctx) => {
  //ctx.state中的对象可以直接在模板中调用
  ctx.state.name = 'Chris'
  //render是koa渲染模板的方法
  //rener的第一个参数就是模板的文件名称
  await ctx.render('home', {
    now: new Date().toLocaleString(),
    title: 'Home'
  })
})

app.listen(8080, () => {
  console.log('listen on 8080')
})

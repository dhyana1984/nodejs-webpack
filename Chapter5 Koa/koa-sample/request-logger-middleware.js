//记录请求和事件
logger = async (ctx, next) => {
  //请求开始时间，在next之前
  const start = Date.now()
  await next()
  console.log(
    //在next之后记录时间差。next之后logger不再执行，而是执行后面的中间件，等到路由执行完毕再回来执行next之后的代码
    `${ctx.method} ${ctx.path} "${ctx.headers['user-agent']}" 
        ${Date.now() - start}ms`
  )
}

module.exports = logger

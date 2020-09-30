import Express from 'express'

//模块化定义路由，使用Express.Router()，定义好以后导出
const userRouter = Express.Router()

userRouter.get('/login', [getLoginPage])

//只有一个路由函数不加中括号也可以
userRouter.get('/register', getRegisterPage)

function getLoginPage(req, resp) {
  resp.send('Login')
}

function getRegisterPage(req, resp) {
  resp.send('Register')
}

export default userRouter

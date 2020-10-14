const sequelize = require('../shared/sequelize')
const { DataTypes } = require('sequelize')
const User = require('../models/user')(sequelize, DataTypes)

//注册账号
exports.register = async (username, password) => {
  const user = await User.findOne({
    where: { username }
  })
  if (user !== null) {
    throw new Error('Account exists')
  }
  return User.create({
    username,
    password
  })
}

//登录
exports.login = async (username, password) => {
  const user = await User.findOne({
    where: { username }
  })
  if (user === null || !user.checkPassword(password)) {
    throw new Error('Credential error')
  }
  return user
}

//查看个人信息
exports.show = (userId) => {
  return User.findByPk(userId, {
    attributes: ['id', 'nickname', 'weibo_count']
  })
}

//修改个人资料
exports.changeProfile = (userId, nickname, password) => {
  return User.update(
    {
      nickname,
      password: password || ''
    },
    { where: { id: userId }, individualHooks: true }
  )
}

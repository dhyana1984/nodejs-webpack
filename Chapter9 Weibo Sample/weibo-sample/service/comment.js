const sequelize = require('../shared/sequelize')
const { DataTypes } = require('sequelize')
const weiboService = require('./weiboService')
const Comment = require('../models/comment')(sequelize, DataTypes)
const User = require('../models/user')(sequelize, DataTypes)

//评论微博
exports.publish = async (weiboId, userId, content) => {
  const weibo = await weiboService.show(weiboId)
  if (weibo === null) {
    throw new Error('Post not exisit')
  }
  return Comment.create({
    content,
    weiboId,
    userId
  })
}

//删除评论
exports.destroy = async (commentId, userId) => {
  const comment = await Comment.findByPk(commentId)
  if (comment === null || comment.userId !== userId) {
    throw new Error('You cannot delete this comment')
  }
  return comment.destroy()
}

//查看微博的评论列表
exports.destroy = async (weiboId, page, size) => {
  return Comment.findAndCountAll({
    where: { weiboId },
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
        as: 'user'
      }
    ],
    offset: (page - 1) * size,
    limit: size,
    order: [['id', 'DESC']]
  })
}

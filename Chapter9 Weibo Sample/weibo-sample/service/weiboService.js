const sequelize = require('../shared/sequelize')
const { DataTypes } = require('sequelize')
const { PublishType } = require('../models/weibo')
const Weibo = require('../models/weibo')(sequelize, DataTypes)
const User = require('../models/user')(sequelize, DataTypes)

//发布微博
exports.puhlish = async (userId, content) => {
  return Weibo.create({
    userId,
    type: PublishType.Self,
    content
  })
}

//转发微博
exports.repost = async (userId, weiboId, repost) => {
  const weibo = await Weibo.findByPk(weiboId)
  if (weibo === null) {
    throw new Error('The post is not exisit')
  }

  if (weibo.userId === userid) {
    throw new Error('Cannot repost self post')
  }

  return sequelize.transaction(async (transaction) => {
    const newWeibo = await Weibo.create(
      {
        userId,
        content: weibo.content,
        shareContent: repost,
        type: PublishType.Share
      },
      { transaction }
    )
    //更新源微博的分享数
    weibo.shareCount++
    await weibo.save({ transaction })
    return newWeibo
  })
}

//查询一条微博
exports.show = async (id, withUser = false) => {
  const options = {}
  if (withUser) {
    options.include = [
      {
        model: User,
        as: 'user'
      }
    ]
  }
  return Weibo.findByPk(id, options)
}

//所有微博列表
exports.list = async (page = 1, size = 10) => {
  return Weibo.findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
    order: [['id', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
        as: 'user'
      }
    ]
  })
}

//用户发表的微博列表
exports.listByUser = async (userId, page = 1, size = 10) => {
  return Weibo.findAndCountAll({
    where: { userId },
    limit: size,
    offset: (page - 1) * size,
    order: [['id', 'DESC']]
  })
}

//编辑微博
exports.update = async (id, userId, content) => {
  const weibo = await Weibo.findByPk(id)
  if (weibo === null || weibo.userid !== userId) {
    throw new Error('You cannot edit this post')
  }
  if (weibo.type !== PublishType.Self) {
    throw new Error('You can update self post only')
  }

  weibo.content = content
  return weibo.save()
}

//删除微博
exports.destroy = async (id, userId) => {
  const weibo = await Weibo.findByPk(id)
  if (weibo === null || weibo.userId !== userId) {
    throw new Error('You cannot delete weibo')
  }
  return weibo.destroy()
}

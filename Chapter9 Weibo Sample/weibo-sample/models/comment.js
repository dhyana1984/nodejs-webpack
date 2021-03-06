const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Weibo = require('./weibo')(sequelize, DataTypes)
  const User = require('./user')(sequelize, DataTypes)

  class Comment extends Model {}

  Comment.init(
    {
      content: {
        type: DataTypes.STRING(140),
        allowNull: false,
        comment: 'comment content'
      }
    },
    {
      sequelize: sequelize,
      tableName: 'comment',
      underscored: true,
      paranoid: true
    }
  )
  // 关联定义
  Comment.belongsTo(Weibo, {
    // 评论属于微博
    constraints: false,
    foreignKey: 'weiboId'
  })
  Comment.belongsTo(User, {
    // 评论属于用户
    constraints: false,
    foreignKey: 'userId',
    as: 'user'
  })

  Comment.afterSave(async (comment) => {
    // 微博评论数+1
    await Weibo.increment(
      { commentCount: 1 },
      { where: { id: comment.weiboId } }
    )
  })
  Comment.afterDestroy(async (comment) => {
    // 微博评论数-1
    await Weibo.increment(
      { commentCount: -1 },
      { where: { id: comment.weiboId } }
    )
  })
  return Comment
}

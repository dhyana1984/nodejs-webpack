const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const User = require('./user')(sequelize, DataTypes)

  class Weibo extends Model {}

  Weibo.init(
    {
      type: { type: DataTypes.TINYINT, allowNull: false, comment: 'post type' },
      content: {
        type: DataTypes.STRING(140),
        allowNull: false,
        comment: 'post content'
      },
      shareContent: { type: DataTypes.STRING(140), comment: 'repost' },
      praiseCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'praise count'
      },
      commentCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'comment count'
      },
      shareCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'repost count'
      }
    },
    {
      sequelize: sequelize,
      tableName: 'weibo',
      underscored: true,
      paranoid: true
    }
  )

  Weibo.belongsTo(User, {
    constraints: false,
    foreignKey: 'userId',
    as: 'user' //userid的别名
  })

  Weibo.afterCreate(async (weibo) => {
    //微博+1
    await User.increment({ weiboCount: 1 }, { where: { id: weibo.userid } })
  })

  Weibo.afterDestroy(async (weibo) => {
    //微博-1
    await User.increment({ weiboCount: -1 }, { where: { id: weibo.userid } })
  })

  return Weibo
}

module.exports.PublishType = {
  Self: 1, //自己发布
  Share: 2 //转发
}

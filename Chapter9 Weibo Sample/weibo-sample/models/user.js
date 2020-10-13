const { Model } = require('sequelize')
const security = require('../shared/security')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //检测密码，User的实例方法
    checkPassword(rasPassword) {
      return security.sha256(rasPassword) === this.password
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Account cannot be empty'
          },
          len: {
            msg: 'The length of Account should be 6-20',
            args: [6, 20]
          },
          isAlphanumeric: {
            msg: 'Account should only contain characters and numbers'
          }
        },
        comment: 'Account'
      },
      password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: 'Password'
      },
      nickname: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        comment: 'Nickname'
      },
      weiboCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'The count of post'
      }
    },
    {
      sequelize,
      tableName: 'user',
      underscored: true,
      paranoid: true,
      indexes: [
        {
          name: 'idx_username',
          fields: ['username']
        }
      ]
    }
  )

  User.beforeSave((user) => {
    //密码处理
    if (user.changed('password') && user.password.length > 0) {
      user.password = security.sha256(user.password)
    }
  })

  return User
}

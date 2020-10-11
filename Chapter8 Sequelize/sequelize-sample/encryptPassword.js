const { Sequelize, Model, DataTypes } = require('sequelize')
const crypo = require('crypto')

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Xi@ngyi1',
  database: 'test',
  timezone: '+08:00',
  pool: {
    max: 10,
    min: 0
  },
  logging: false
})

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER({ unsigned: true }),
      primaryKey: true,
      autoIncrement: true,
      comment: 'User ID'
    },
    username: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
      comment: 'account'
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: 'password'
    }
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'user',
    paranoid: true, //启动软删除
    //定义声明周期事件
    hooks: {
      //在beforeSave事件中
      beforeSave(user) {
        //如果user表更新password字段（包括第一次插入）
        if (user.changed('password')) {
          //对password字段进行加密
          user.password = crypo
            .createHash('sha256')
            .update(user.password)
            .digest('hex')
        }
      }
    }
  }
)

//通过User的静态类方法定义hook函数
// User.beforeSave((user) => {
//   //对password字段进行加密
//   user.password = crypo.createHash('sha256').update(user.password).digest('hex')
// })

//同步数据库
sequelize
  .sync()
  .then(() => {
    return User.create({
      username: 'chris',
      password: 'Tester99'
    })
  })
  .then((user) => {
    console.log(user.toJSON())
  })
  .catch((err) => {
    console.error(err)
  })

User.findByPk(1).then((user) => {
  console.log(user.toJSON())
})

//配置sequelize
const { Sequelize, Model, DataTypes } = require('sequelize')
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

//定义模型分成两步
//第一步继承Sequelize的Model
class User extends Model {}
//第二步使用init方法初始化模型字段和模型选项
User.init(
  {
    //init方法中对象的键就是表的字段名，值是类型和其他属性设置
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
    tableName: 'user',
    modelName: 'user'
  }
)

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

User.create({
  username: 'chris1',
  password: 'Tester99'
})

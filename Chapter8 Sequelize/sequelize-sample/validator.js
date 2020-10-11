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

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING(40),
      //验证email字段是不是邮箱格式
      validate: {
        isEmail: true
      },
      allowNull: false
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
      //存入数据的时候，validator会验证这里的值是不是email格式
      email: 'bb@aa.com'
    })
  })
  .then((user) => {
    console.log(user.toJSON())
  })
  .catch((err) => {
    console.error(err)
  })

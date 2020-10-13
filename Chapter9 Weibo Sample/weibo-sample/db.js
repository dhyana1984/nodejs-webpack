const sequelize = require('./shared/sequelize')
const { DataTypes } = require('sequelize')

require('./models/comment')(sequelize, DataTypes)
require('./models/comment')(sequelize, DataTypes)
require('./models/weibo')(sequelize, DataTypes)

sequelize
  .sync({ force: true })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    sequelize.close()
  })

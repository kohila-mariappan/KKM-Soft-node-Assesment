const dbConfig = require('../config/db-Config')

const Sequelize = require('sequelize')

const sequelizeInstance = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelizeInstance

db.User = require('./User')(sequelizeInstance, Sequelize)
db.Product = require('./Product')(sequelizeInstance, Sequelize)


db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!')
  })

module.exports = db

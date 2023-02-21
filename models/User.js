module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      userName: {
        type: Sequelize.STRING,
        allownull: false
      },
      userEmail: {
        type: Sequelize.STRING,
        allownull: false,
        unique: true
  
      },
      userPassword: {
        type: Sequelize.STRING,
        allownull: false
      }
    })
  
    return User
  }
  
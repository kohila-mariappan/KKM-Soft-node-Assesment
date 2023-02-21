module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      productName: {
        type: Sequelize.STRING,
        allownull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allownull: false,  
      },
      quantity: {
        type: Sequelize.INTEGER,
        allownull: false
      },
      active:{
        type:Sequelize.BOOLEAN

      }
    })
  
    return Product
  }
  
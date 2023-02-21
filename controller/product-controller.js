const db = require('../models')
const Product = db.Product
const statusCode = require('../utils/statusCode')

const createProduct = async(req,res)=>{
    try{
        if(req.body){
            const findProduct = await Product.findOne({where:{productName : req.body.productName}})
            if(findProduct){
                const message = 'Product is already there add new product'
                statusCode.successResponse(res,message)
            }
            else{
                const newProduct = await Product.create({
                    productName:req.body.productName,
                    price:req.body.price,
                    quantity:req.body.quantity,
                    active:true
                })
                const message = 'Product created Successfully'
                statusCode.successResponseWithData(res,message,newProduct)
            }
        }
        else{
            const message = 'All inputs are required'
            statusCode.badRequestResponse(res,message)
        }

    }
    catch(err){
        const message = 'enter poduct name and required details'
        statusCode.errorResponse(res, message)

    }
}

const updateProduct = async(req,res)=>{
    const findProduct = await Product.findOne({where:{productId : req.body.productId}})
    if(!findProduct){
        const message = 'Invalid Product Id'
        statusCode.errorResponse(res,message)
    }
    else{
        findProduct.productName = req.body.productName? req.body.productName:findProduct.productName;
        findProduct.price= req.body.price?req.body.price:findProduct.price;
        findProduct.quantity= req.body.quantity?req.body.quantity:findProduct.quantity;
        findProduct.active= req.body.active?req.body.active:findProduct.active;
        const updatedProduct = await findProduct.save()
        const message = 'Updated Successfully'
        statusCode.successResponseWithData(res,message,findProduct)
    }
}

const productList = async (req, res) => {
    const limit = 10
    const offset = 0
  
    const data = await Product.findAll({
      limit,
      offset,
    })
    console.log(data)
    const message = 'product List'
    statusCode.successResponseWithData(res, message, data)
}
const deleteProduct = async (req, res) => {
    const count = await Product.destroy({ where: { productId: req.body.productId } })
    console.log(`deleted row(s): ${count}`)
    const message = 'Product was deleted successfully'
    statusCode.successResponseWithData(res, message)
  }

module.exports={
    createProduct,
    updateProduct,
    productList,
    deleteProduct
}
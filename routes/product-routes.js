const express = require('express')
const router = express.Router()
const Product = require('../controller/product-controller')
const productValidation = require('../validator/product-validator')

router.post('/create', [productValidation.addProduct],Product.createProduct)
router.post('/update', Product.updateProduct)
router.get('/list', Product.productList)
router.post('/delete', Product.deleteProduct)

module.exports = router

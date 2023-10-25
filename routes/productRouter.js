const express = require('express');
const productController = require('../controller/productController')

const router = express.Router()

router.get('/',productController.productAll)
router.get('/:id',productController.getProduct)
router.post('/create',productController.createProduct)

module.exports = {
    router
}
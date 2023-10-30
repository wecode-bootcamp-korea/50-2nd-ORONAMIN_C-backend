const express = require('express');
const productController = require('../controller/productController')

const router = express.Router()

router.get('/',productController.productAll)
router.get('/:id',productController.getProduct)
router.post('/create',productController.createProduct)
router.delete('/:id',productController.deleteProduct)
router.put('/:productId',productController.updateProduct)

module.exports = {
    router
}
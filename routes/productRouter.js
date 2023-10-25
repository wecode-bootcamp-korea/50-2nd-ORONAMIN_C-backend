const express = require('express');
const productController = require('../controller/productController')

const router = express.Router()

router.get('/all',productController.productAll)
router.get('/:id',productController.getProduct)
router.post('/create',productController.createProduct)

module.exports = {
    router
}
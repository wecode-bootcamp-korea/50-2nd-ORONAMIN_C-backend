const express = require('express');
const productController = require('../controller/productController')

const router = express.Router()

router.get('/all',productController.productAll)
router.get('/product/:id',productController.getProduct)

module.exports = {
    router
}
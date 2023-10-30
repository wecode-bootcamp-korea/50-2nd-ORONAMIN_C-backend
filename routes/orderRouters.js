const express = require('express');
const router = express.Router();

const orderController = require('../controller/orderController')

router.get('/order',orderController.busket);
router.post('/addProduct',orderController.addProduct);
router.post('/cutProduct',orderController.cutProduct);
router.post('/addBusket',orderController.addBusket);
router.post('/deletProduct',orderController.deleteProduct);
router.get('/paymentBusket',orderController.paymentBusket)



module.exports = { router }


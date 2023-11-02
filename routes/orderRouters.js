const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.get('/order',orderController.orderBasket);
router.post('/productQuantity',orderController.increaseBasketQuantity);
router.post('/userProductQuantity',orderController.decreaseBasketQuantity);
router.post('/productBusket',orderController.createBasket);
router.delete('/busket',orderController.deleteProduct);
router.post('/paymentBasket',orderController.payBasket);
module.exports = { router }


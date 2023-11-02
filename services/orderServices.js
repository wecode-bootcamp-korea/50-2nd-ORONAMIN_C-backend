const orderDao = require('../models/orderDao');
const middleErr = require('../middleware/error')

const orderBasket = async (userId)=>{
    const busketData = await orderDao.orderBasket(userId);
    return busketData
}

const increaseBasketQuantity = async (userId, productId)=>{
    const data = await orderDao.increaseBasketQuantity(userId, productId);
    return data
}

const decreaseBasketQuantity = async (userId, productId) =>{
    const data = await orderDao.decreaseBasketQuantity(userId,productId);
    return data
}

const deleteProduct = async(userId, productId) =>{
    const data = await orderDao.deleteProduct(userId, productId);
    return data
}

const createBasket = async (userId, product_id)=>{
    const data = await orderDao.createBasket(userId, product_id);
    return data
};

const payBasket = async(userId, order_number,address,products, total_price)=>{

    const userPoint = await orderDao.getPointsByUserId(userId);
    if(total_price > userPoint[0].point ){
        middleErr.error(500, 'LACK_OF_USER_AVAILABILITY_POINTS!')
    }
    await orderDao.payBasket(userId, order_number,address,products, total_price);
    await orderDao.pointReduction(userId, total_price)
};
module.exports = {orderBasket, increaseBasketQuantity
    ,decreaseBasketQuantity, createBasket, deleteProduct, payBasket}
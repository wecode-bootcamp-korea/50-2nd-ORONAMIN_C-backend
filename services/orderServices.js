const orderDao = require('../models/orderDao');

const busket = async (verifiedEmail)=>{
    const busketData = await orderDao.busket(verifiedEmail);
    return busketData
}

const addProduct = async (verifiedEmail, productId)=>{
    const data = await orderDao.addProduct(verifiedEmail, productId);
    return data
}

const cutProduct = async (verifiedEmail, productId) =>{
    const data = await orderDao.cutProduct(verifiedEmail,productId);
    return data
}

const deleteProduct = async(verifiedId, productId) =>{
    const data = await orderDao.deleteProduct(verifiedId, productId)
}

const addBusket = async (verifiedUserId, product_id)=>{
    const data = await orderDao.addBusket(verifiedUserId, product_id);
    return data
};

const paymentBusket = async(verifiedUserId)=>{
    const userData = await orderDao.paymentBusket(verifiedUserId);
    return userData
}


module.exports = {busket, addProduct,cutProduct, addBusket, paymentBusket, deleteProduct}
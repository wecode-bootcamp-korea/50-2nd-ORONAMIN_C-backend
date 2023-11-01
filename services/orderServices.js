const { remainingPoints } = require('../controller/orderController');
const orderDao = require('../models/orderDao');
const middleErr = require('../middleware/error')

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
    const data = await orderDao.deleteProduct(verifiedId, productId);
    return data
}

const addBusket = async (verifiedUserId, product_id)=>{
    const data = await orderDao.addBusket(verifiedUserId, product_id);
    return data
};

// const paymentBusket = async(verifiedUserId)=>{
//     const userData = await orderDao.paymentBusket(verifiedUserId);
//     return userData
// }
const payBusket = async(verifiedId, order_number,address,products, total_price)=>{

    const userPoint = await orderDao.remainingPoints(verifiedId);

    if(total_price > userPoint[0].point ){
        middleErr.error(500, 'LOW_POINTS!')
    }
   

    await orderDao.payBusket(verifiedId, order_number,address,products, total_price);
    await orderDao.pointReduction(verifiedId, total_price)
   
}



module.exports = {busket, addProduct,cutProduct, addBusket, deleteProduct, payBusket}
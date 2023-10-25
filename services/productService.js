const productDao = require('../models/productDao')

const getProducts = async() =>{
    const productAll = await productDao.getProducts()
    return productAll
}

const getProduct = async(id) =>{
    const product = await productDao.getProduct(id)
    return product
} 



module.exports = {
    getProducts,getProduct
}
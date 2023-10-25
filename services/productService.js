const productDao = require('../models/productDao')

const getProducts = async(brandName,scentName) =>{
    const productAll = await productDao.getProducts(brandName,scentName)
    return productAll
}

const getProduct = async(id) =>{
    const product = await productDao.getProduct(id)
    return product
} 



module.exports = {
    getProducts,getProduct
}
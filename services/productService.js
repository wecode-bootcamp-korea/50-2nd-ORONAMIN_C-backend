const productDao = require('../models/productDao')

const getProducts = async() =>{
    const productAll = await productDao.getProducts()
    return productAll
}

const getProduct = async(id) =>{
    const product = await productDao.getProduct(id)
    return product
} 

const createProduct = async(name,price,description,brand_id,scent_id) =>{
    const product = await productDao.createProduct(name,price,description,brand_id,scent_id)
    return product
}



module.exports = {
    getProducts,getProduct,createProduct
}
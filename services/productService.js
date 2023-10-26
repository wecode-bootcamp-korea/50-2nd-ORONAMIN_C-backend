const productDao = require('../models/productDao')

const getProducts = async(brandName,scentName) =>{
    const productAll = await productDao.getProducts(brandName,scentName)
    return productAll
}

const getProduct = async(id) =>{
    const product = await productDao.getProduct(id)
    if(product.length === 0){
        const err = new Error()
        err.statusCode = 400
        err.message = "없는 게시물입니다."
        throw err;
    }
    return product
} 

const createProduct = async(name,price,description,brand_id,scent_id) =>{
    const product = await productDao.createProduct(name,price,description,brand_id,scent_id)
    return product
}
const deleteProduct = async(id) =>{
    const product = await productDao.deleteProduct(id)
    return product
} 



module.exports = {
    getProducts,getProduct,createProduct,deleteProduct
}
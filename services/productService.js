const productDao = require('../models/productDao')
const jwt = require('../middleware/jwt')

const getProducts = async(brandName,scentName) =>{
    const productAll = await productDao.getProducts(brandName,scentName)
    return productAll
}

const getProduct = async(id) =>{
    const product = await productDao.getProduct(id)
    if(product.length === 0){
        const err = new Error()
        err.statusCode = 400
        err.message = "없는 상품입니다."
        throw err;
    }
    return product
} 

const createProduct = async(productName,price,description,brandId,scentId) =>{
    const product = await productDao.createProduct(productName,price,description,brandId,scentId)
    return product
}

const updateProduct = async(productId,productName,price,description,brandId,scentId)=>{
    const getProduct = await productDao.getProduct(id)
    if(getProduct.length === 0){
        const err = new Error()
        err.statusCode = 404
        err.message = "없는 상품입니다."
        throw err;
    }
    const product = await productDao.updateProduct(productId,productName,price,description,brandId,scentId)
    return product 

}
const deleteProduct = async(id) =>{
    const product = await productDao.deleteProduct(id)
    return product
} 



module.exports = {
    getProducts,getProduct,createProduct,deleteProduct,updateProduct
}
const productService = require('../services/productService')
const middleJwt = require('../middleware/jwt');

const productAll = async(req,res) =>{
    try{
        const {brandName,scentName} = req.query
        const products = await productService.getProducts(brandName,scentName)
        res.status(200).json({products})
    }catch(err){
        res.status(500 || statusCode).json({message: err.message})
    }
}

const getProduct = async(req,res) => {
    const id = req.params.id
    try{
        const product = await productService.getProduct(id)
        res.status(200).json({product})
    }catch(err){
        res.status(err.statusCode).json({message: err.message})
    }
}
const createProduct = async(req,res) =>{
    const {productName,price,description,brandId,scentId} = req.body
    const token = req.headers.authorization.substr(7)
    const decodedToken = await middleJwt.verifyToken(token)
    try{
        if(!productName||!price||!description||!brandId||!scentId){
            throw new Error("INPUT_KEY_ERROR")
        }
        if(token){
            if(decodedToken.status === 1){
                await productService.createProduct(productName,price,description,brandId,scentId)
                res.status(200).json({message: "successfully created"})
            }else{
                throw new Error("Permission Denied")
            }
        }
    }catch(err){
        res.status(404).json({message: err.message})
    }
}
const updateProduct = async (req,res) =>{
    const productId = req.params.productId
    const {productName,price,description,brandId,scentId} = req.body
    const token = req.headers.authorization.substr(7)
    const decodedToken = await middleJwt.verifyToken(token)
    try{
        if(token){
            if(decodedToken.status === 1){
                await productService.updateProduct(productId,productName,price,description,brandId,scentId)
                res.status(200).json({message: "successfully updated"})
            }else{
                throw new Error("Permission Denied")
            }
        }
    }catch(err){
        res.status(500 || statusCode).json({message: err.message})
    }
}
const deleteProduct = async(req,res)=>{
    const id = req.params.id
    const token = req.headers.authorization.substr(7)
    const decodedToken = await middleJwt.verifyToken(token)
    try{
        if(token){
            if(decodedToken.status === 1)
            await productService.deleteProduct(id)
            res.status(204).json({message:"삭제되었습니다."})
        }else {
            res.status(404).json({message: err.message})
        }
    }catch(err){
        res.status(404).json({message: err.message})
    }
}


module.exports = {
    productAll,getProduct,createProduct,deleteProduct,updateProduct
}
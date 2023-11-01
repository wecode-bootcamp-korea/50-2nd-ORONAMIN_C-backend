const productService = require('../services/productService')
const middleJwt = require('../middleware/jwt');

const productAll = async(req,res) =>{
    try{
        const {brandName,scentName} = req.query
        const products = await productService.getProducts(brandName,scentName)
        console.log(products[0].scent_desc)
        res.status(200).json(products)
    }catch(err){
        res.status(500).json({message: "error"})
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
    console.log(decodedToken)
    try{
        if(!productName||!price||!description||!brandId||!scentId){
            return res.status(400).json({message: "INPUT_KEY_ERROR"})
        }
        if(token){
            if(decodedToken.status === 1){
                await productService.createProduct(productName,price,description,brandId,scentId)
                res.status(200).json({message: "등록완료~!"})
            }else{
                res.status(404).json({message: "권한이 없습니다."})
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
                res.status(200).json({message: "수정완료~!"})
            }else{
                res.status(404).json({message:"수정불가"})
            }
        }
    }catch(err){
        res.status(404).json({message: err.message})
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
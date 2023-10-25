const productService = require('../services/productService')

const productAll = async(req,res) =>{
    try{
        const {brandName,scentName} = req.query
        const products = await productService.getProducts(brandName,scentName)
        console.log(brandName,scentName)
        res.status(200).json({products})
    }catch(err){
        res.status(500).json({message: "error"})
    }
}

const getProduct = async(req,res) => {
    const id = req.params.id
    try{
        const product = await productService.getProduct(id)
        if(product.length === 0){
            const err = new Error()
            err.statusCode = 400
            err.message = "없는 게시물입니다."
            throw err;
        }
        res.status(200).json({product})
    }catch(err){
        res.status(err.statusCode).json({message: err.message})
    }
}
module.exports = {
    productAll,getProduct
}
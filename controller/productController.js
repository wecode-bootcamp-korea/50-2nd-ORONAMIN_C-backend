const productService = require('../services/productService')

const productAll = async(req,res) =>{
    try{
        const products = await productService.getProducts()
        // a
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
const createProduct = async(req,res) =>{
    const {name,price,description,brand_id,scent_id} = req.body
    try{
        const product = await productService.createProduct(name,price,description,brand_id,scent_id)
        res.status(200).json({message: "등록완료~!"})

    }catch(err){
        res.status(404).json({message: "실패.."})
    }
}
module.exports = {
    productAll,getProduct,createProduct
}
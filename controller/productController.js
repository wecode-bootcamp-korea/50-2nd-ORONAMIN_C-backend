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
const createProduct = async(req,res) =>{
    const {name,price,description,brand_id,scent_id} = req.body
    try{
        await productService.createProduct(name,price,description,brand_id,scent_id)
        res.status(200).json({message: "등록완료~!"})

    }catch(err){
        res.status(404).json({message: "실패.."})
    }
}

const deleteProduct = async(req,res)=>{
    const id = req.params.id
    try{
        await productService.deleteProduct(id)
        res.status(204).json({message:"헤헷삭제!"})
    }catch(err){
        res.status(404).json({message:"왜 안될까...?"})

    }
}
module.exports = {
    productAll,getProduct,createProduct,deleteProduct
}
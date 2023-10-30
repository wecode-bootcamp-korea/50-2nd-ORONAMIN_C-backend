const { verify } = require('jsonwebtoken');
const orderServices = require('../services/orderServices');
const jwt = require('jsonwebtoken')
const { verifyToken } = require('../middleware/jwt')


const busket = async (req,res) => {
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        console.log(verifiedToken)
        const verifiedEmail = verifiedToken.email
        
        const userData = await orderServices.busket(verifiedEmail);
        res.status(201).json(userData)
};

const addProduct = async (req, res) => {
        const productId = req.body.product_id
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        console.log(verifiedToken)
        const verifiedEmail = verifiedToken.email
        console.log(verifiedEmail)

    await orderServices.addProduct(verifiedEmail, productId);
    return res.status(201).json({message : "ADD COMPLETE!" });
};

const cutProduct = async (req, res) =>{
    try{
        const productId = req.body.product_id
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        const verifiedEmail = verifiedToken.email
        console.log(verifiedEmail)
        await orderServices.cutProduct(verifiedEmail,productId);
        return res.status(201).json({message : "CUT COMPLETE!"})
    }catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message})
    }
};

const deleteProduct = async(req, res)=>{
    try{
        const productId = req.body.product_id;
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        const verifiedId = verifiedToken.id
        await orderServices.deleteProduct(verifiedId, productId)
        return res.status(201).json({message : "DELETE COMPLETE!"})
    }catch(err){
        console.log(err)
        return res.status(err.statusCode||500).json({message : err.meesage})
    }
}

const addBusket = async (req, res) =>{
    try{
        const { product_id } = req.body;
        if(!product_id){
            return res.status(400).json({message : 'KEY_ERROR'})
        }
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        const verifiedUserId = verifiedToken.id
        console.log(verifiedUserId)
        await orderServices.addBusket(verifiedUserId, product_id);
        return res.status(201).json({message : "ADDBUSKET SUCCESS!"})
    }catch(err){
        console.log(err)
        return res.status(err.statusCode|| 500).json({message : err.meesage})
    }
};

const paymentBusket = async(req,res)=>{
    try{
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7);
        const verifiedToken = await verifyToken(token)
        const verifiedId = verifiedToken.id
        const userData= await orderServices.paymentBusket(verifiedId)
        return res.status(201).json({userData})

    }catch(err){
        console.log(err)
        return res.status(err.statusCode||500).json({message : err.meesage})
    }
}

module.exports = { busket , addProduct,cutProduct, addBusket, paymentBusket, deleteProduct }
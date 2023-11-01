const { verify } = require('jsonwebtoken');
const orderServices = require('../services/orderServices');

const { verifyToken } = require('../middleware/jwt')



const busket = async (req,res) => {
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        const verifiedEmail = verifiedToken.email
        const userData = await orderServices.busket(verifiedEmail);
        res.status(201).json(userData)
};

const addProduct = async (req, res) => {
        const productId = req.body.product_id
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        const verifiedEmail = verifiedToken.email

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
        await orderServices.addBusket(verifiedUserId, product_id);
        return res.status(201).json({message : "ADDBUSKET SUCCESS!"})
    }catch(err){
        console.log(err)
        return res.status(err.statusCode|| 500).json({message : err.meesage})
    }
};

const payBusket = async(req,res)=>{
    try{
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7);
        const verifiedToken = await verifyToken(token)
        const verifiedId = verifiedToken.id
        const { order_number,address,products,total_price} = req.body
        if(!order_number || !address || !products || !total_price){
            console.log(err)
            middleErr.error(500, 'KEY_ERROR')
        }
        
        await orderServices.payBusket(verifiedId, order_number,address,products, total_price)
        return res.status(201).json({message: "PAYMENT COMPLETE!"})
    }catch(err){
        console.log(err)
        return res.status(err.statusCode || 500).json({message : err.meesage})
    }
};



module.exports = { busket , addProduct,cutProduct, addBusket, deleteProduct, payBusket }
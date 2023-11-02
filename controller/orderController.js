const orderServices = require('../services/orderServices');
const middleErr = require('../middleware/error')
const { verifyToken } = require('../middleware/jwt')

const orderBasket = async (req,res) => {
        try{
            const frontToken = req.headers.authorization;
            const token = frontToken.substr(7)
            const verifiedToken = await verifyToken(token)
            const userId = verifiedToken.id
            const userData = await orderServices.orderBasket(userId);
            res.status(201).json(userData)
        }catch(err){
            console.log(err)
            return res.status(err.statusCode || 500).json({message : err.message})
        }
};

const increaseBasketQuantity = async (req, res) => {
        try{
            const productId = req.body.product_id
            const frontToken = req.headers.authorization;
            const token = frontToken.substr(7)
            const verifiedToken = await verifyToken(token)
            const userId = verifiedToken.id
            await orderServices.increaseBasketQuantity(userId, productId);
            return res.status(201).json({message : "ADD COMPLETE!" });
        }catch(err){
            console.log(err)
            return res.status(err.statusCode || 500).json({message: err.meesage})
        }
};

const decreaseBasketQuantity = async (req, res) =>{
    try{
        const productId = req.body.product_id
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        const userId = verifiedToken.id
        await orderServices.decreaseBasketQuantity(userId,productId);
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
        const userId = verifiedToken.id
        await orderServices.deleteProduct(userId, productId)
        return res.status(201).json({message : "DELETE COMPLETE!"})
    }catch(err){
        console.log(err)
        return res.status(err.statusCode||500).json({message : err.meesage})
    }
}

const createBasket = async (req, res) =>{
    try{
        const { product_id } = req.body;
        if(!product_id){
            return res.status(400).json({message : 'KEY_ERROR'})
        }
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7)
        const verifiedToken = await verifyToken(token)
        const userId = verifiedToken.id
        await orderServices.createBasket(userId, product_id);
        return res.status(201).json({message : "ADDBUSKET SUCCESS!"})
    }catch(err){
        console.log(err)
        return res.status(err.statusCode|| 500).json({message : err.meesage})
    }
};

const payBasket = async(req,res)=>{
    try{
        const frontToken = req.headers.authorization;
        const token = frontToken.substr(7);
        const verifiedToken = await verifyToken(token)
        const userId = verifiedToken.id
        const { order_number,address,products,total_price} = req.body
        if(!order_number || !address || !products || !total_price){
            console.log(err)
            middleErr.error(500, 'KEY_ERROR')
        }
        await orderServices.payBasket(userId, order_number,address,products, total_price)
        return res.status(201).json({message: "PAYMENT COMPLETE!"})
    }catch(err){
        console.log(err)
        return res.status(err.statusCode || 500).json({message : err.meesage})
    }
};
module.exports = { orderBasket ,increaseBasketQuantity,decreaseBasketQuantity, 
    createBasket, deleteProduct, payBasket }
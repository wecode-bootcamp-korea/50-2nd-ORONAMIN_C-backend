const userService = require('../services/userService');
const middleNick = require('../util/nickMaker');
const middleJwt = require('../middleware/jwt');

const signUp = async(req,res) => {
    try{
        if(!req.body.email || !req.body.password){
            return res.status(400).json({message : 'KEY_ERROR'})
        }
        const userEmail = req.body.email
        const userPassword = req.body.password
        const userNickname = req.body.nickname || middleNick.nicknameMaker()
        const userGender = req.body.gender || ""

        await userService.signUp( userEmail, userPassword, userNickname, userGender )

        res.status(200).json({message:'SIGNUP_SUCCESS'})
    }catch(err){
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }

}
const signIn = async(req,res) => {
    try{
        if(!req.body.email || !req.body.password){
            return res.status(400).json({message : 'KEY_ERROR'})
        }
        const userEmail = req.body.email
        const userPassword = req.body.password
        const token =  await userService.signIn( userEmail, userPassword )
        res.status(200).json({message:'SIGNIN_SUCCESS', token:token})
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message : err.message})
    }
}

const list = async(req,res) => {
    try{
        const userList = await userService.list()
        res.status(200).json(userList)
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message : err.message})
    }
}

const oneList = async(req,res) => {
    try{
        const userEmail = req.params.userEmail
        if(!req.params.userEmail){
            return res.status(400).json({message : 'KEY_ERROR'})
        }
        const oneList = await userService.oneList( userEmail )
        res.status(200).json( oneList)
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message : err.message})
    }
}

const addPoint = async(req,res) => {
    try{
        const token = req.headers.authorization.substr(7)
        const verifiedToken = await middleJwt.verifyToken(token)
        const result = await userService.addPoint(verifiedToken)

        res.status(200).json({ message : 'POINT_CHARGE_SUCCESS' , result})
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message : err.message})
    }
}

module.exports = { signUp, signIn, list, oneList, addPoint }
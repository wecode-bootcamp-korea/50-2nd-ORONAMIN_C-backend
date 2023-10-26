const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const middleErr = require('./error')

dotenv.config()

const makeToken = async(userId, userEmail, userNickname, admin_status) => {
    return jwt.sign({id:userId,email:userEmail,nickname:userNickname, status : admin_status},process.env.TYPEORM_SECRETKEY,{expiresIn:60*60})
}

const verifyToken = async(token) => {
    try{
        return jwt.verify(token, process.env.TYPEORM_SECRETKEY)
    }catch(err){
        middleErr.error(400, "TOKEN_BROKEN")
    }
}

module.exports = { makeToken, verifyToken }
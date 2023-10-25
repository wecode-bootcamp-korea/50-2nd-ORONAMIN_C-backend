const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")

dotenv.config()

const makeToken = async(userId, userEmail, userNickname) => {
    return jwt.sign({id:userId,email:userEmail,nickname:userNickname},process.env.TYPEORM_SECRETKEY,{expiresIn:60*60})
}

const verifyToken = async(token) => {
    return jwt.verify(token, process.env.TYPEORM_SECRETKEY)
}

module.exports = { makeToken, verifyToken }
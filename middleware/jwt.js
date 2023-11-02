const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const middleErr = require('./error')

dotenv.config()

/// 페이로드에 id, email, nickname, status를 담아 토큰을 발행해주는 함수
const makeToken = async(userId, userEmail, admin_status) => {
    return jwt.sign({id:userId,email:userEmail, status : admin_status},process.env.TYPEORM_SECRETKEY,{expiresIn:60*60})
}

// 토큰을 입력하면 그 토큰의 유효성을 검증해주는 함수
const verifyToken = async(token) => {
    try{
        return jwt.verify(token, process.env.TYPEORM_SECRETKEY)
    }catch(err){
        middleErr.error(400, "TOKEN_BROKEN")
    }
}

module.exports = { makeToken, verifyToken }


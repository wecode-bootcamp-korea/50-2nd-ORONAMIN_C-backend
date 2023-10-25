const userDao = require('../models/userDao')
const middleHash = require('../middleware/hash')
const middleErr = require('../middleware/error')
const middleJwt = require('../middleware/jwt')

const signUp = async( userEmail, userPassword, userNickname, userGender ) => {
    if(!userEmail.includes('@') || !userEmail.includes('.')){
        middleErr.error(400, "이메일의 형식이 올바르지 않습니다")
    }
    if(userPassword.length<10){
        middleErr.error(400, "비밀번호는 10자 이상이어야 합니다")
    }
    const checkEmail = await userDao.existCheck( userEmail )
    if(checkEmail.length!==0){
        middleErr.error(400, "이미 가입된 이메일 입니다")   
    }
    const hashedUserPassword = await middleHash.hash(userPassword)
    const createUser = await userDao.createUser(
        userEmail, hashedUserPassword, userNickname, userGender
        )
    return createUser
}

const signIn = async( userEmail, userPassword ) => {
    if(!userEmail.includes('@') || !userEmail.includes('.')){
        middleErr.error(400, "이메일의 형식이 올바르지 않습니다")
    }
    const checkEmail = await userDao.existCheck( userEmail )
    if(checkEmail.length==0){
        middleErr.error(400, "존재하지 않는 계정입니다")
    }
    const findedPassword = await userDao.existCheck( userEmail )
    const test = await middleHash.validation(userPassword, findedPassword[0].password)
    if(!test){
        middleErr.error(400, "비밀번호가 틀렸습니다")
    }
    const tokenData = await userDao.existCheck( userEmail )
    const token = await middleJwt.makeToken(tokenData[0].id,tokenData[0].email,tokenData[0].nickname)
    return token
}

const list = async() => {
    const userList = await userDao.list()
    return userList
}

const addPoint = async(token) => {
    const checkEmail = await userDao.existCheck( token.email )
    if(checkEmail.length==0){
        middleErr.error(400, "존재하지 않는 계정입니다")
    }
    return await userDao.addPoint( checkEmail[0].email )
}

module.exports = { signUp, signIn, list, addPoint }
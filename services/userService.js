const userDao = require('../models/userDao')
const middleHash = require('../middleware/hash')
const middleErr = require('../middleware/error')
const middleJwt = require('../middleware/jwt')

const signUp = async( userEmail, userPassword, userNickname, userPhoneNumber, userBirthDay, userGender ) => {
    if(!userEmail.includes('@') || !userEmail.includes('.')){
        middleErr.error(400, "EMAIL_FORMAT_INCORRECT")
    }
    if(userPassword.length<10){
        middleErr.error(400, "PASSWORD_FORMAT_INCORRECT")
    }
    const checkEmail = await userDao.existCheck( userEmail )
    if(checkEmail.length!==0){
        middleErr.error(400, "OVERLAPPED_EMAIL")
    }
    const hashedUserPassword = await middleHash.hash(userPassword)
    const createUser = await userDao.createUser(
        userEmail, hashedUserPassword, userNickname, userPhoneNumber, userBirthDay, userGender
        )
    return createUser
}

const signIn = async( userEmail, userPassword ) => {
    if(!userEmail.includes('@') || !userEmail.includes('.')){
        middleErr.error(400, "EMAIL_FORMAT_INCORRECT")
    }
    const checkEmail = await userDao.existCheck( userEmail )
    if(checkEmail.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }
    const findedPassword = await userDao.existCheck( userEmail )
    const test = await middleHash.validation(userPassword, findedPassword[0].password)
    if(!test){
        middleErr.error(400, "WRONG_PASSWORD")
    }
    const tokenData = await userDao.existCheck( userEmail )
    const token = await middleJwt.makeToken(tokenData[0].id,tokenData[0].email,tokenData[0].nickname, tokenData[0].admin_status)
    return token
}

const list = async() => {
    const userList = await userDao.list()
    return userList
}

const oneList = async( userEmali ) =>{
    const result = await userDao.existCheck( userEmali )
    return {email : result[0].email,
    nickname : result[0].nickname,
    result : result[0].point}
}

const addPoint = async(token) => {
    const verify = await userDao.verifyUser( token.id, token.email, token.nickname, token.status )
    if(verify.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }
    return await userDao.addPoint( verify[0].email )
}

const changeUserInfo = async( token, nickname, phone_number, birthday, gender, address ) => {
    const verify = await userDao.verifyUser( token.id, token.email, token.nickname, token.status )
    if(verify.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }
    const data = { nickname, phone_number, birthday, gender, address }
    data.email = verify[0].email
    return await userDao.changeUserInfo( data ) 
}

module.exports = { signUp, signIn, list, oneList, addPoint, changeUserInfo }
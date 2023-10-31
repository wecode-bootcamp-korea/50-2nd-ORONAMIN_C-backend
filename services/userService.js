const userDao = require('../models/userDao')
const middleHash = require('../middleware/hash')
const middleErr = require('../middleware/error')
const middleJwt = require('../middleware/jwt')
const middleMailer = require('../middleware/mailer')

const signUp = async( userEmail, userPassword, userNickname, userPhoneNumber, userBirthDay, userGender ) => {
    if(!userEmail.includes('@') || !userEmail.includes('.')){
        middleErr.error(400, "EMAIL_FORMAT_INCORRECT")
    }
    if(userPassword.length<10){
        middleErr.error(400, "PASSWORD_FORMAT_INCORRECT")
    }
    console.log()
    if(userPhoneNumber.length<13){
        middleErr.error(400, "PHONE_NUMBER_FORMAT_INCORRECT")
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
    const token = await middleJwt.makeToken(tokenData[0].id, tokenData[0].email , tokenData[0].admin_status)
    return token
}

const list = async() => {
    const userList = await userDao.list()
    return userList
}

const oneList = async( token ) =>{
    const verify = await userDao.verifyUser( token.id, token.email, token.status )
    if(verify.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }
    return {email : verify[0].email,
    nickname : verify[0].nickname,
    phone_number : verify[0].phone_number,
    address : verify[0].address,
    point : verify[0].point}
}

const addPoint = async(token) => {
    const verify = await userDao.verifyUser( token.id, token.email, token.status )
    if(verify.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }
    return await userDao.addPoint( verify[0].email )
}

const changeUserInfo = async( token, nickname, password, phone_number, birthday, gender, address ) => {
    const verify = await userDao.verifyUser( token.id, token.email, token.status )
    if(verify.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }
    let  newPassword = ''
    if(password.length>0){
        if(password.length<10){
            middleErr.error(400, "PASSWORD_FORMAT_INCORRECT")
        }
        newPassword = await middleHash.hash( password )
    }
    const data = {
        email : verify[0].email,
        nickname : nickname,
        password : newPassword,
        phone_number : phone_number,
        birthday : birthday,
        gender : gender,
        address : address 
    }
    return await userDao.changeUserInfo( data ) 
}

const findPassword = async( userEmail ) => {
    if(!userEmail.includes('@') || !userEmail.includes('.')){
        middleErr.error(400, "EMAIL_FORMAT_INCORRECT")
    }
    const checkEmail = await userDao.existCheck( userEmail )
    if(checkEmail.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }

    const newPassword = Math.random().toString(35).slice(2)
    const hashedUserPassword = await middleHash.hash( newPassword )

    await userDao.findPassword( userEmail, hashedUserPassword )
    
    return newPassword
}

// const auth = ( userEmail ) => {
//     console.log(userEmail)
//     const verifyNumber = Math.random().toString(35).slice(2)
//     console.log(verifyNumber)
//     middleMailer.sendEmail( userEmail, verifyNumber )
// }

module.exports = {
    signUp,
    signIn,
    list,
    oneList,
    addPoint,
    changeUserInfo,
    findPassword,
    // auth
}
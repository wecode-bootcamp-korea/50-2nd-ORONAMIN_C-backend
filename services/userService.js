const userDao = require('../models/userDao')
const middleHash = require('../middleware/hash')
const middleErr = require('../middleware/error')
const middleJwt = require('../middleware/jwt')
// const middleMailer = require('../middleware/mailer')

const signUp = async( userEmail, userPassword, userNickname, userPhoneNumber, userBirthDay, userGender ) => {
    if(!userEmail.includes('@') || !userEmail.includes('.')){
        middleErr.error(400, "EMAIL_FORMAT_INCORRECT")
    }
    if(userPassword.length<10){
        middleErr.error(400, "PASSWORD_FORMAT_INCORRECT")
    }
    const phonenumberFormatLength = 13
    if(userPhoneNumber.length < phonenumberFormatLength){
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
    const [ tokenData ] = await userDao.existCheck( userEmail )
    const token = await middleJwt.makeToken(tokenData.id, tokenData.email , tokenData.admin_status)
    return token
}

const list = async() => {
    const userList = await userDao.getUserList()
    return userList
}

const oneList = async( token ) =>{
    const [ verify ] = await userDao.verifyUser( token.id, token.email, token.status )
    if(verify.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }
    return {email : verify.email,
    nickname : verify.nickname,
    phone_number : verify.phone_number,
    address : verify.address,
    point : verify.point}
}

const addPoint = async(token) => {
    const [ verify ] = await userDao.verifyUser( token.id, token.email, token.status )
    if(verify.length==0){
        middleErr.error(400, "EMAIL_NOT_FOUND")
    }
    return await userDao.addPoint( verify.email )
}

const changeUserInfo = async( token, nickname, password, phone_number, birthday, gender, address ) => {
    const [ verify ] = await userDao.verifyUser( token.id, token.email, token.status )
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
        email : verify.email,
        nickname : nickname,
        password : newPassword,
        phone_number : phone_number,
        birthday : birthday,
        gender : gender,
        address : address 
    }
    return await userDao.updateUserInfo( data ) 
}

const setNewPassword = async( userEmail ) => {
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
    setNewPassword,
    // auth
}
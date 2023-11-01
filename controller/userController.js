const userService = require('../services/userService');
const middleNick = require('../util/nickMaker');
const middleJwt = require('../middleware/jwt');
const middleErr = require('../middleware/error');

const signUp = async(req,res) => {
    try{
        if(!req.body.email || !req.body.password || !req.body.phone_number || !req.body.birthday){
            middleErr.error(400, 'KEY_ERROR')
        }
        const {
            email           : userEmail,
            password        : userPassword,
            nickname        : userNickname      = middleNick.nicknameMaker(),
            phone_number    : userPhoneNumber,
            birthday        : userBirthDay,
            gender          : userGender        = ""
        } = req.body
        await userService.signUp( userEmail, userPassword, userNickname, userPhoneNumber, userBirthDay, userGender )

        res.status(200).json({message:'SIGNUP_SUCCESS'})
    }catch(err){
        console.log(err)
        res.status(err.statusCode || 500).json({message : err.message})
    }

}
const signIn = async(req,res) => {
    try{
        if(!req.body.email || !req.body.password){
            middleErr.error(400, 'KEY_ERROR')
        }
        const {
            email       : userEmail,
            password    : userPassword
        } = req.body
        const token =  await userService.signIn( userEmail, userPassword )
        res.status(200).json({message:'SIGNIN_SUCCESS', token:token})
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message : err.message})
    }
}

const list = async(req,res) => {
    try{
        const result = await userService.list()
        res.status(200).json( result )
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message : err.message})
    }
}

const oneList = async(req,res) => {
    try{
        const token = req.headers.authorization.substr(7)
        const verifiedToken = await middleJwt.verifyToken(token)
        const result = await userService.oneList(verifiedToken)
        
        res.status(200).json( result )
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

const changeUserInfo = async(req,res) => {
    try{
        const token = req.headers.authorization.substr(7)
        const verifiedToken = await middleJwt.verifyToken(token)
        const {
            nickname        : changeNickname      = "",
            password        : changePassword      = "",
            phone_number    : changePhone_number  = "",
            birthday        : changeBirthday      = "",
            gender          : changeGender        = "",
            address         : changeAdress        = ""
        } = req.body
        const dataCount = changeNickname.length
                        +changePassword.length
                        +changePhone_number.length
                        +changeBirthday.length
                        +changeGender.length+changeAdress.length
        if(dataCount==0){
            middleErr.error(400, 'KEY_ERROR')
        }

        const result = await userService.changeUserInfo(
                verifiedToken, changeNickname, changePassword, changePhone_number, changeBirthday, changeGender, changeAdress
            )

        res.status(200).json({ message : 'USER_INFO_CHANGED', result})
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message : err.message})
    }
}

const findPassword = async(req,res) => {
    try{
        if(!req.body.email){
            middleErr.error(400, 'KEY_ERROR')
        }
        const userEmail = req.body.email

        const result =  await userService.setNewPassword( userEmail )

        res.status(200).json({ message : 'PASSWORD_REISSUANCE', result})
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message : err.message})
    }
}

// const auth = async(req,res) => {
//     try{
//         if(!req.body.email){
//             return res.status(400).json({message : 'KEY_ERROR'})
//         }
//         const userEmail = req.body.email

//         await userService.auth( userEmail )

//         res.status(200).json({message:'AUTHMAIL_SENDING_SUCCESS'})
//     }catch(err){
//         console.log(err)
//         res.status(err.statusCode || 500).json({message : err.message})
//     }
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
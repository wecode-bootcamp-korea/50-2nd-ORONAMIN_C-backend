const userService = require('../services/userService');
const middleNick = require('../util/nickMaker');
const middleJwt = require('../middleware/jwt');

const signUp = async(req,res) => {
    try{
        if(!req.body.email || !req.body.password || !req.body.phone_number || !req.body.birthday){
            return res.status(400).json({message : 'KEY_ERROR'})
        }
        const userEmail = req.body.email
        const userPassword = req.body.password
        const userNickname = req.body.nickname          || middleNick.nicknameMaker()
        const userPhoneNumber = req.body.phone_number
        const userBirthDay = req.body.birthday
        const userGender = req.body.gender              || ""

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
        // const userEmail = req.params.userEmail
        // if(!req.params.userEmail){
        //     return res.status(400).json({message : 'KEY_ERROR'})
        // }
        // const result = await userService.oneList( userEmail )
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
        const changeNickname = req.body.nickname            || ""
        const changePassword = req.body.password            || ""
        const changePhone_number = req.body.phone_number    || ""
        const changeBirthday = req.body.birthday            || ""
        const changeGender = req.body.gender                || ""
        const changeAdress = req.body.address               || ""
        const count = changeNickname.length
                        +changePassword.length
                        +changePhone_number.length
                        +changeBirthday.length
                        +changeGender.length+changeAdress.length
        if(count==0){
            return res.status(400).json({message : 'KEY_ERROR'})
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
            return res.status(400).json({message : 'KEY_ERROR'})
        }
        const userEmail = req.body.email

        const result =  await userService.findPassword( userEmail )

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
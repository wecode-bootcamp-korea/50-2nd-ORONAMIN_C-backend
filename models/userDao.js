const { appDataSource } = require('./datasource')
const middleErr = require('../middleware/error')

const existCheck = async( userEmail ) => {
    try{
        const result = appDataSource.query(`
            SELECT id, email, nickname, password, admin_status FROM users WHERE email = ?
        `, [ userEmail ]
        )
        return result
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
}
const verifyUser = async( userId, userEmail, userNickname, admin_status ) => {
    try{
        const result = await appDataSource.query(`
            SELECT id, email, nickname, admin_status FROM users
            WHERE id = ? AND email = ? AND nickname = ? AND admin_status = ?
        `, [userId, userEmail, userNickname, admin_status])
        return result
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
}

const createUser = async ( userEmail, hashedUserPassword, userNickname, userGender ) => {
    try{
        return await appDataSource.query(`
            INSERT INTO users(email, password, nickname, gender, point)
            values(?,?,?,?,?)`,
            [userEmail, hashedUserPassword,userNickname, userGender, 1000000]
        )
    }
    catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
}

const list = async() => {
    try{
        return await appDataSource.query(`
            SELECT * FROM users;
        `)
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
}

const addPoint = async( userEmail ) => {
    try{
        const addRandomPoint = Math.floor(Math.random()*1000)*1000
        const findNowPoint =  await appDataSource.query(`
            select point from users where email = ?
        `, [userEmail])
        const replacePoint = findNowPoint[0].point+addRandomPoint
        const change = await appDataSource.query(`
            update users set point = ? where email = ?
        `, [replacePoint, userEmail])
        const result = await appDataSource.query(`
            select email, point from users where email = ?
        `, [userEmail])
        return {email : result[0].email, '당첨 포인트' : addRandomPoint, '현재 포인트' : result[0].point}
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
}

module.exports = { existCheck, createUser, list, addPoint, verifyUser }
const { appDataSource } = require('./datasource')
const middleErr = require('../middleware/error')
const sqlResult = require('../util/sqlResult')

const existCheck = async( userEmail ) => {
    try{
        const result = appDataSource.query(`
            SELECT * FROM users WHERE email = ?
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

const createUser = async ( userEmail, hashedUserPassword, userNickname, userPhoneNumber, userBirthDay, userGender ) => {
    try{
        const create = await appDataSource.query(`
            INSERT INTO users(email, password, nickname, phone_number, birthday, gender, point)
            values(?,?,?,?,?,?,?)`,
            [userEmail, hashedUserPassword, userNickname, userPhoneNumber, userBirthDay, userGender, 1000000]
        )
        // 쿼리가 정상 작동했음에도 불구하고 데이터가 수정되지 않은 경우 에러 캐치
        if(create.insertId=0){
            middleErr.error(500, 'DATA_INSERT_FAILED')
        }
        sqlResult.sqlResult(create)
        return create
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
        // 쿼리가 정상 작동했음에도 불구하고 데이터가 수정되지 않은 경우 에러 캐치
        if(change.affectedRows=0){
            middleErr.error(500, 'DATA_UPDATE_FAILED')
        }
        sqlResult.sqlResult(change)
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
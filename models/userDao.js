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
            SELECT point FROM users WHERE email = ?
        `, [userEmail])
        const replacePoint = findNowPoint[0].point+addRandomPoint
        const change = await appDataSource.query(`
            UPDATE users SET point = ? WHERE email = ?
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

const changeUserInfo = async( data ) => {
    const index = ['nickname', 'phone_number', 'birthday', 'gender', 'address']
    let query1 = ''
    for (i=0; i<index.length; i++){
        if(!data[index[i]].length==0){query1 = query1 + index[i] + ' = ' + `'${data[index[i]]}'` + ', ' }
      }
    if(query1.length==0){
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
    query1 = 'UPDATE users SET ' + query1.slice(0,-2) + ' WHERE ' + `email = '${data.email}'`
    const change = await appDataSource.query(query1)
    if(change.affectedRows=0){
        middleErr.error(500, 'DATA_UPDATE_FAILED')
    }
    sqlResult.sqlResult(change)
    const viewResult = await appDataSource.query(`
        select email, nickname, phone_number, birthday, gender, address from users where email = ?
    `, [data.email])
    return viewResult[0]
}

module.exports = { existCheck, createUser, list, addPoint, verifyUser, changeUserInfo }
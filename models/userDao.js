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

const changeUserInfo = async( result, data ) => {
    const index = ['nickname', 'phone_number', 'birthday', 'gender', 'address']
    let count = 0
    const key = []
    const value = []
    for (i=0; i<5; i++){
        if(result[index[i]]){
            key.push(index[i])
            value.push(result[index[i]])
            count = count+1
        }
    }
    if(count===5){
        const value2 = 'UPDATE users SET '
                    + key[0] + ' = ' + `'${value[0]}'` + ", "
                    + key[1] + ' = ' + `'${value[1]}'` + ", "
                    + key[2] + ' = ' + `'${value[2]}'` + ", "
                    + key[3] + ' = ' + `'${value[3]}'` + ", "
                    + key[4] + ' = ' + `'${value[4]}'` 
                    + ' WHERE email = ' + `'${data.email}'`
        const change = await appDataSource.query( value2 )
        sqlResult.sqlResult(change)
    }else if(count===4){
        const value2 = 'UPDATE users SET '
                    + key[0] + ' = ' + `'${value[0]}'` + ", "
                    + key[1] + ' = ' + `'${value[1]}'` + ", "
                    + key[2] + ' = ' + `'${value[2]}'` + ", "
                    + key[3] + ' = ' + `'${value[3]}'` 
                    + ' WHERE email = ' + `'${data.email}'`
        const change = await appDataSource.query( value2 )
        sqlResult.sqlResult(change)
    }else if(count===3){
        const value2 = 'UPDATE users SET '
                    + key[0] + ' = ' + `'${value[0]}'` + ", "
                    + key[1] + ' = ' + `'${value[1]}'` + ", "
                    + key[2] + ' = ' + `'${value[2]}'`
                    + ' WHERE email = ' + `'${data.email}'`
        const change = await appDataSource.query( value2 )
        sqlResult.sqlResult(change)
    }else if(count===2){
        const value2 = 'UPDATE users SET '
                    + key[0] + ' = ' + `'${value[0]}'` + ", "
                    + key[1] + ' = ' + `'${value[1]}'`
                    + ' WHERE email = ' + `'${data.email}'`
        const change = await appDataSource.query( value2 )
        sqlResult.sqlResult(change)
    }else if(count===1){
        const value2 = 'UPDATE users SET '
                    + key[0] + ' = ' + `'${value[0]}'`
                    + ' WHERE email = ' + `'${data.email}'`
        const change = await appDataSource.query( value2 )
        sqlResult.sqlResult(change)
    }else if(count===0){
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
    const viewResult = await appDataSource.query(`
        select email, nickname, phone_number, birthday, gender, address from users where email = ?
    `, [data.email])
    return viewResult
}

module.exports = { existCheck, createUser, list, addPoint, verifyUser, changeUserInfo }
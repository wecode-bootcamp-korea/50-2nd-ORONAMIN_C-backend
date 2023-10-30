const {appDataSource} = require('./datasource')
const middleErr = require('../middleware/error')

const busket = async (verifiedEmail) => {
    try {
        const userId = await appDataSource.query(`
        select id from users where email = '${verifiedEmail}'
        `)
        console.log("아이디" ,userId)
        const extractedId = userId[0].id
        console.log( extractedId)
        
        const result = await appDataSource.query(`
        select u.nickname, u.email, u.address, u.point, p.name, b.name, b.logo, i.image_source, s.name, ps.status,bsk.quantity
        from users u
        join basket bsk on u.id = bsk.user_id
        join products p on bsk.product_id = p.id
        join brands b on p.brand_id = b.id
        join images i on p.id = i.product_id
        join scents s on p.scent_id = s.id
        join pay_status ps on bsk.status_id = ps.id
        where u.id = '${extractedId}' and ps.id = 1
        `)
        console.log(result)
        return result
        
    } catch (err) {
        console.log(err)
        middleErr.error(500 , 'INVALID_DATA_INPUT' )
    }
}

const addProduct = async (verifiedEmail, productId) => {
    try {
        const userId = await appDataSource.query(`
        select id from users where email = '${verifiedEmail}'
        `)
        console.log("아이디" ,userId)
        const extId = userId[0].id
        const product_id = await appDataSource.query(`
        select id from products where id = '${productId}'
        `)
        const extProduct_id = product_id[0].id
        
         const result =  await appDataSource.query(`
                UPDATE basket
                SET basket.quantity = basket.quantity + 1
                WHERE basket.user_id = '${extId}' and basket.product_id = '${extProduct_id}'
        `)
        console.log( result )
    } catch (err) {
        console.log(err)
        const error = new Error('INVALID_DATA_INPUT')
        error.statusCode = 500;
        throw error
    }
};

const cutProduct = async(verifiedEmail,productId) => {
    try{
        const userId = await appDataSource.query(`
        select id from users where email = '${verifiedEmail}'
        `)
        const extractedId = userId[0].id
        const product_id = await appDataSource.query(`
        select id from products where id = '${productId}'
        `)
        const extProduct_id = product_id[0].id
        await appDataSource.query(`
        update basket
        set basket.quantity = basket.quantity - 1
        where basket.user_id = '${extractedId}' and basket.product_id = '${extProduct_id}'
        `)
    
    }catch(err){
        console.log(err)
        middleErr.error(500 , 'INVALID_DATA_INPUT' )
    }
};

const deleteProduct = async(verifiedId, productId)=>{
    try{
        const userId = await appDataSource.query(`
        select id from users where id = '${verifiedId}'
        `)
        const extId = userId[0].id
        const product_id = await appDataSource.query(`
        select id from products where id = '${productId}'
        `)
        const extProductId = product_id[0].id
        return await appDataSource.query(`
        DELETE FROM basket
        WHERE user_id = '${extId}' AND product_id = '${extProductId}';
        `)
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
}

const addBusket = async(verifiedUserId, product_id)=>{
    try{
        return await appDataSource.query(`
        insert into basket(user_id, product_id, quantity, status_id)
        values (?,?,?,?)
        `, [verifiedUserId, product_id, 1, 1])
        
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
};
 const paymentBusket= async(verifiedUserId)=>{
    try{
        const result = await appDataSource.query(`
        update basket
        set basket.status_id = basket.status_id + 1
        where basket.user_id = '${verifiedUserId}'
        `)
        console.log(result)

        const userData = await appDataSource.query(`
        select u.nickname, u.email, u.address, u.point, p.name, b.name, b.logo, i.image_source, s.name, ps.status,bsk.quantity
        from users u
        join basket bsk on u.id = bsk.user_id
        join products p on bsk.product_id = p.id
        join brands b on p.brand_id = b.id
        join images i on p.id = i.product_id
        join scents s on p.scent_id = s.id
        join pay_status ps on bsk.status_id = ps.id
        where u.id = '${verifiedUserId}' and ps.id = 2
        `)
        console.log(userData)
        return userData
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
 }





module.exports = { busket,addProduct, cutProduct, addBusket, paymentBusket, deleteProduct }
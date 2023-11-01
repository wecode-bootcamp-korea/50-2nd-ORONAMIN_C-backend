const {appDataSource} = require('./datasource')
const middleErr = require('../middleware/error')

// 장바구니에 담긴 상품 보여주기
const busket = async (verifiedEmail) => {
    try {
        const userId = await appDataSource.query(`
        select id from users where email = '${verifiedEmail}'
        `)
        const extractedId = userId[0].id
        
        const result = await appDataSource.query(`
        SELECT p.id AS product_id, p.price AS product_price, p.name AS product_name, b.logo AS product_logo, bsk.quantity AS basket_quantity, b.name AS brand_name
        FROM users u
        JOIN basket bsk ON u.id = bsk.user_id
        JOIN products p ON bsk.product_id = p.id
        JOIN brands b ON p.brand_id = b.id
        JOIN pay_status ps ON bsk.status_id = ps.id
        WHERE u.id = '${extractedId}' AND ps.id = 1;       
        `)
        return result
        
    } catch (err) {
        console.log(err)
        middleErr.error(500 , 'INVALID_DATA_INPUT' )
    }
}

//장바구니 상품 수량추가
const addProduct = async (verifiedEmail, productId) => {
    try {
        const userId = await appDataSource.query(`
        select id from users where email = '${verifiedEmail}'
        `)
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
    } catch (err) {
        console.log(err)
        const error = new Error('INVALID_DATA_INPUT')
        error.statusCode = 500;
        throw error
    }
};
// 장바구니 상품 삭감
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

//장바구니 상품 삭제
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
};

// 장바구니 담기
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



//오더 테이블 생성
 const payBusket = async(verifiedId, order_number,address, products, total_price)=>{
    try{
        for (let i=0; i<products.length; i++){
            console.log(products[i].id, products[i].quantity)
            const product_id = products[i].id
            const product_quantity = products[i].quantity
        await appDataSource.query(`
        insert into orders (order_number, user_id, address, product_id, product_quantity, total_price)
        values (?,?,?,?,?,?)
        `,[order_number, verifiedId, address, product_id, product_quantity, total_price ]);
        } 
        
        await appDataSource.query(`
        update basket
        set basket.status_id = basket.status_id + 1
        where basket.user_id = ? and basket.status_id = ?`,[verifiedId , 1])


    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
 }

//잔여포인트 확인
const remainingPoints = async(verifiedId)=>{
        return await appDataSource.query(`
        select point
        from users
        where id = ?
        `, [verifiedId])
}


//포인트 차감
const pointReduction = async (verifiedId, total_price)=> {
    
    const userPoint = await appDataSource.query(`
    select point from users  where id =?
    `, [verifiedId])
    console.log(userPoint)

    const modifiedPoint = userPoint[0].point - total_price

    return await appDataSource.query(`update users set point =? where id =?`,[modifiedPoint, verifiedId])
    
}






module.exports = { busket,addProduct, cutProduct, addBusket, deleteProduct, payBusket, remainingPoints
,pointReduction }
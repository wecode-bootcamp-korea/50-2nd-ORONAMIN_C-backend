const {appDataSource} = require('./datasource')
const middleErr = require('../middleware/error')

// 장바구니에 담긴 상품 보여주기
const orderBasket= async (userId) => {
    try {
        const result = await appDataSource.query(`
        SELECT p.id AS product_id, p.price AS product_price, p.name AS product_name, b.logo AS product_logo, bsk.quantity AS basket_quantity, b.name AS brand_name
        FROM users u
        JOIN basket bsk ON u.id = bsk.user_id
        JOIN products p ON bsk.product_id = p.id
        JOIN brands b ON p.brand_id = b.id
        JOIN pay_status ps ON bsk.status_id = ps.id
        WHERE u.id = '${userId}' AND ps.id = 1;       
        `)
        return result
        
    } catch (err) {
        console.log(err)
        middleErr.error(500 , 'INVALID_DATA_INPUT' )
    }
}

//장바구니 상품 수량추가
const increaseBasketQuantity = async (userId, productId) => {
    try {
         return await appDataSource.query(`
                UPDATE basket
                SET basket.quantity = basket.quantity + 1
                WHERE basket.user_id = '${userId}' and basket.product_id = '${productId}'
        `)
    } catch (err) {
        console.log(err)
        const error = new Error('INVALID_DATA_INPUT')
        error.statusCode = 500;
        throw error
    }
};
// 장바구니 상품 삭감
const decreaseBasketQuantity = async(userId,productId) => {
    try{
        await appDataSource.query(`
        update basket
        set basket.quantity = basket.quantity - 1
        where basket.user_id = '${userId}' and basket.product_id = '${productId}'
        `)
    }catch(err){
        console.log(err)
        middleErr.error(500 , 'INVALID_DATA_INPUT' )
    }
};

//장바구니 상품 삭제
const deleteProduct = async(userId, productId)=>{
    try{
        return await appDataSource.query(`
        DELETE FROM basket
        WHERE user_id = '${userId}' AND product_id = '${productId}';
        `)
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
};

// 장바구니 담기
const basketStatusType = {
    'beforePayment': 1,
    'afterPayment': 2
  }
const createBasket = async(userId, product_id)=>{
    try{
        return await appDataSource.query(`
        insert into basket(user_id, product_id, quantity, status_id)
        values (?,?,?,?)
        `, [userId, product_id, 1, basketStatusType.beforePayment])
        
    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
};

//오더 테이블 생성
 const payBasket = async(verifiedId, order_number,address, products, total_price)=>{
    try{
        for (let i=0; i<products.length; i++){
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
        where basket.user_id = ? and basket.status_id = ?`,[verifiedId , basketStatusType.beforePayment])

    }catch(err){
        console.log(err)
        middleErr.error(500, 'INVALID_DATA_INPUT')
    }
 }

//잔여포인트 확인
const getPointsByUserId = async(userId)=>{
        return await appDataSource.query(`
        select point
        from users
        where id = ?
        `, [userId])
}
//포인트 차감
const pointReduction = async (userId, total_price)=> {
    const userPoint = await appDataSource.query(`
    update users set point = point - '${total_price}' where id = '${userId}'
    `)
    return userPoint
};
module.exports = { orderBasket, increaseBasketQuantity, decreaseBasketQuantity,
    createBasket, deleteProduct, payBasket, getPointsByUserId, pointReduction }
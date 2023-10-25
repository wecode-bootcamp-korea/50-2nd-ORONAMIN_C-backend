const { appDataSource } = require("./datasource")

const getProducts = async () =>{
    return await appDataSource.query(`
    SELECT * FROM products 
    `)
}

const getProduct = async (id) =>{
    return await appDataSource.query(`
    SELECT * from products join images on products.id = images.product_id where products.id = ?
    `,[id])
}

module.exports = {
    getProducts,getProduct
}
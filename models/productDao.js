const { appDataSource } = require("./datasource")

const getProducts = async (brandName,scentName) =>{
    return await appDataSource.query(`
    SELECT * FROM products join images on products.id = images.product_id WHERE products.brand_id = '${brandName}' or products.scent_id = '${scentName}'`)
}

const getProduct = async (id) =>{
    return await appDataSource.query(`
    SELECT * from products join images on products.id = images.product_id where products.id = ?
    `,[id])
}
const createProduct = async(name,price,description,brand_id,scent_id) =>{
    return await appDataSource.query(`
    insert into products (name,price,description,brand_id,scent_id) values('${name}',${price},'${description}',${brand_id},${scent_id})
    `)
}

module.exports = {
    getProducts,getProduct,createProduct
}
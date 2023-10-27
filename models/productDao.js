const { appDataSource } = require("./datasource")

const getProducts = async (brandName,scentName) =>{
    return await appDataSource.query(`
    SELECT products.id,products.name as product_name,products.price,products.description,products.brand_id,products.scent_id,products.stock,
    scents.name,scents.scent_desc,
    brands.name as brand_name,
    images.image_source,images.product_id 
    FROM products 
    JOIN images ON products.id = images.product_id
    JOIN scents ON products.scent_id = scents.id
    JOIN brands ON products.brand_id = brands.id 
    WHERE products.brand_id = '${brandName}' or products.scent_id = '${scentName}'`)
}
/*
SELECT products.
    FROM products
    JOIN images ON products.id = images.product_id
    JOIN scents ON products.scent_id = scents.id
    JOIN brands ON products.brand_id = brands.id WHERE products.brand_id = '${brandName}' or products.scent_id = '${scentName}'`)
*/

const getProduct = async (id) =>{
    return await appDataSource.query(`
    SELECT products.name,products.price,products.description,images.image_source from products join images on products.id = images.product_id join scents on products.scent_id = scents.id 
    where products.id = ?
    `,[id])
}

module.exports = {
    getProducts,getProduct
}
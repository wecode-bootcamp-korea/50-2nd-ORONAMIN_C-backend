const { appDataSource } = require("./datasource")
const {updateQuery} = require("../util/update")
const {scentDesc} = require("../util/scentDesc")
const getProducts = async (brandName,scentName) =>{
    const result =  await appDataSource.query(`
    SELECT products.id,products.name as product_name,products.price,products.description,products.brand_id,products.scent_id,products.stock,
    scents.name as scent_name,scents.scent_desc,
    brands.name as brand_name,
    images.image_source 
    FROM products 
    LEFT JOIN images ON products.image_id = images.id
    LEFT JOIN scents ON products.scent_id = scents.id
    LEFT JOIN brands ON products.brand_id = brands.id 
    WHERE products.brand_id = '${brandName}' or products.scent_id = '${scentName}'`)
    const scentDescMap = await scentDesc(result)
      return scentDescMap
}



const getProduct = async (id) =>{
    return await appDataSource.query(`
    SELECT products.id,products.name,products.price,products.description,
    images.image_source,
    scents.name as scents_name
    from products 
    LEFT JOIN images ON products.image_id = images.id
    LEFT JOIN scents on products.scent_id = scents.id 
    where products.id = ?
    `,[id])
}
const createProduct = async(productName,price,description,brandId,scentId) =>{
    return await appDataSource.query(`
    insert into products (name,price,description,brand_id,scent_id) values('${productName}',${price},'${description}',${brandId},${scentId})
    `)
}

const deleteProduct  = async(id) => {
    return await appDataSource.query(`
    delete from products where id = '${id}'
    `)
}
const updateProduct = async(productId,productName,price,description,brandId,scentId)=>{
    const updateFields = await updateQuery(productName, price, description, brandId, scentId)
    return await appDataSource.query(`
    update products set
    ${updateFields}
    WHERE id = '${productId}'
    `)
}

module.exports = {
    getProducts,getProduct,createProduct,deleteProduct,updateProduct
}
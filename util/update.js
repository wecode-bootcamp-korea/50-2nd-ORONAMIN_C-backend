const updateQuery = (productName, price, description, brandId, scentId,imageId)=>{
    let updateFields = '';
    if (productName !== undefined) {
      updateFields += `name = '${productName}', `;
    }
  
    if (price !== undefined) {
      updateFields += `price = '${price}', `;
    }
  
    if (description !== undefined) {
      updateFields += `description = '${description}', `;
    }
  
    if (brandId !== undefined) {
      updateFields += `brand_id = '${brandId}', `;
    }
  
    if (scentId !== undefined) {
      updateFields += `scent_id = '${scentId}', `;
    }

    if(imageId !== undefined){
      updateFields += `image_id = '${imageId}', `;

    }
    updateFields = updateFields.slice(0, -2);

    return updateFields
}

module.exports = {
    updateQuery   
}
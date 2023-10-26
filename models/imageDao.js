const { appDataSource } = require("./datasource");

//프로덕트 조회
const checkProduct = async (productId) => {
  return await appDataSource.query(`
  SELECT * FROM products where id = ${productId}`);
};

//프로덕트아이디로 이미지 조회
const getImage = async (productId) => {
  return await appDataSource.query(`
  SELECT * FROM images where product_id = ${productId}
  `);
};
//이미지아이디로 이미지 조회
const getImageId = async (imageId) => {
  return await appDataSource.query(`
  SELECT * FROM images WHERE id = ${imageId}`);
};

//이미지 생성
const createImage = async (productId, imageSource) => {
  const result = await appDataSource.query(`
    INSERT INTO images(product_id, image_source)
    VALUES(${productId}, "${imageSource}")`);
  console.log(result);
  return result;
};

//이미지 삭제
const deleteImage = async (imageId) => {
  return await appDataSource.query(`
  DELETE FROM images where id = ${imageId}`);
};

//이미지 수정
const updateImage = async (imageId, imageSource) => {
  return await appDataSource.query(`
  UPDATE images SET image_source = "${imageSource}" where id = ${imageId}`);
};

module.exports = {
  createImage,
  getImage,
  checkProduct,
  deleteImage,
  getImageId,
  updateImage,
};

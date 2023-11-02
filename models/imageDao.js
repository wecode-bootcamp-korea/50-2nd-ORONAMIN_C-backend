const { appDataSource } = require("./datasource");

//이미지 아이디로 이미지 조회
const getImageById = async (imageId) => {
  return await appDataSource.query(
    `
  SELECT * FROM images WHERE id = ?`,
    [imageId]
  );
};

//이미지 Desc로 이미지 조회
const getImageByDesc = async (imageDesc) => {
  return await appDataSource.query(
    `
  SELECT * FROM images WHERE image_desc = ?`,
    [imageDesc]
  );
};

//이미지 생성
const createImage = async (imageDesc, imageSource) => {
  const result = await appDataSource.query(
    `
    INSERT INTO images(image_desc, image_source)
    VALUES(?,?)`,
    [imageDesc, imageSource]
  );
  console.log(result);
  return result;
};

//이미지 삭제
const deleteImage = async (imageId) => {
  return await appDataSource.query(
    `
  DELETE FROM images where id = ?`,
    [imageId]
  );
};

//이미지 수정
const updateImage = async (imageId, imageDesc, imageSource) => {
  return await appDataSource.query(
    `
  UPDATE images SET image_source = ?, image_desc = ? where id = ? `,
    [imageSource, imageDesc, imageId]
  );
};

module.exports = {
  createImage,
  getImageById,
  getImageByDesc,
  deleteImage,
  updateImage,
};

const imageDao = require("../models/imageDao");

//이미지 생성
const createImage = async (productId, imageSource) => {
  const checkProduct = await imageDao.checkProduct(productId); // 프로덕트 자체가 존재하는가 하지 않는가

  if (checkProduct.length == 0) {
    const err = new Error("해당 프로덕트가 존재하지 않습니다");
    err.statusCode = 400;
    throw err;
  }

  const result = await imageDao.createImage(productId, imageSource);

  return result;
};

//특정 이미지 조회
const getImage = async (productId) => {
  const checkProduct = await imageDao.checkProduct(productId); // 프로덕트 자체가 존재하는가 하지 않는가

  if (checkProduct.length == 0) {
    const err = new Error("해당 프로덕트가 존재하지 않습니다");
    err.statusCode = 400;
    throw err;
  }

  const result = await imageDao.getImage(productId);
  if (result.length == 0) {
    const err = new Error("해당 프로덕트에 이미지가 존재하지 않습니다");
    err.statusCode = 400;
    throw err;
  }

  return result;
};

//이미지 삭제
const deleteImage = async (imageId) => {
  const checkImage = await imageDao.getImageId(imageId);

  if (checkImage.length == 0) {
    const err = new Error("해당 이미지가 존재하지 않습니다");
    err.statusCode = 400;
    throw err;
  }

  const result = await imageDao.deleteImage(imageId);
  return result;
};

//이미지 수정
const updateImage = async (imageId, imageSource) => {
  const checkImage = await imageDao.getImageId(imageId);

  if (checkImage.length == 0) {
    const err = new Error("해당 이미지가 존재하지 않습니다");
    err.statusCode = 400;
    throw err;
  }

  const result = await imageDao.updateImage(imageId, imageSource);
  return result;
};

module.exports = {
  createImage,
  getImage,
  deleteImage,
  updateImage,
};

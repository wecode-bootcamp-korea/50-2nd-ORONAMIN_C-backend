const imageDao = require("../models/imageDao");
const error = require("../middleware/error");

//이미지 생성
const createImage = async (imageDesc, imageSource) => {
  return await imageDao.createImage(imageDesc, imageSource);
};

//이미지 아이디로 특정 이미지 조회
const getImageById = async (imageId) => {
  const result = await imageDao.getImageById(imageId);
  if (result.length == 0) {
    error.error(400, "해당 ID의 이미지가 존재하지 않습니다");
  }
  return result;
};

//이미지 desc로 이미지 조회
const getImageByDesc = async (imageDesc) => {
  const result = await imageDao.getImageByDesc(imageDesc);
  if (result.length == 0) {
    error.error(400, "해당 Desc의 이미지가 존재하지 않습니다");
  }

  return result;
};

//이미지 삭제
const deleteImage = async (imageId) => {
  const checkImage = await imageDao.getImageById(imageId);

  if (checkImage.length == 0) {
    error.error(400, "해당 이미지가 존재하지 않습니다");
  }

  return await imageDao.deleteImage(imageId);
};

//이미지 수정
const updateImage = async (imageId, imageDesc, imageSource) => {
  const checkImage = await imageDao.getImageById(imageId);

  if (checkImage.length == 0) {
    error.error(400, "해당 이미지가 존재하지 않습니다");
  }

  return await imageDao.updateImage(imageId, imageDesc, imageSource);
};

module.exports = {
  createImage,
  getImageById,
  getImageByDesc,
  deleteImage,
  updateImage,
};

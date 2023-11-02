const imageService = require("../services/imageService");
const middleJwt = require("../middleware/jwt");
const error = require("../middleware/error");

//이미지 등록
const createImage = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회

    const imageSource = req.body.imageSource;
    const imageDesc = req.body.imageDesc;
    if (!imageSource || !imageDesc) {
      error.error(400, "KEY_ERROR");
    }
    await imageService.createImage(imageDesc, imageSource);

    return res.status(200).json({ message: "IMAGE_CREATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
//이미지 아이디로 이미지 조회
const getImageById = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const imageId = req.params.imageId;
    const result = await imageService.getImageById(imageId);

    return res.status(200).json({ message: "IMAGE_LOADED_BY_ID", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
//이미지 Desc로 이미지 조회
const getImageByDesc = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const imageDesc = req.query.desc;
    console.log("imageDesc:", imageDesc);
    const result = await imageService.getImageByDesc(imageDesc);
    return res.status(200).json({ message: "IMAGE_LOADED_BY_DESC", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//이미지 삭제
const deleteImage = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const imageId = req.params.imageId;
    if (!imageId) {
      error.error(400, "KEY_ERROR");
    }
    await imageService.deleteImage(imageId);

    return res.status(200).json({ message: "IMAGE_DELETED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//이미지 수정
const updateImage = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const imageId = req.params.imageId;
    const imageSource = req.body.imageSource;
    const imageDesc = req.body.imageDesc;
    if (imageDesc.length == 0 || imageSource.length == 0) {
      error.error(400, "KEY_ERROR");
    }
    const result = await imageService.updateImage(
      imageId,
      imageDesc,
      imageSource
    );
    return res.status(200).json({ message: "IMAGE_UPDATED", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createImage,
  getImageById,
  getImageByDesc,
  deleteImage,
  updateImage,
};

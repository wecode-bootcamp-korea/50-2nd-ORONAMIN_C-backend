const imageService = require("../services/imageService");
const middleJwt = require("../middleware/jwt");

//이미지 등록
const createImage = async (req, res) => {
  try {
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(400).json({ message: "관리자 권한이 없습니다." });
    }

    const imageSource = req.body.imageSource;
    const productId = req.body.productId;

    if (!imageSource || !productId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await imageService.createImage(productId, imageSource);

    return res.status(200).json({ message: "IMAGE_CREATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
//특정 이미지 조회
const getImage = async (req, res) => {
  try {
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken[0].status != 1) {
      return res.status(400).json({ message: "관리자 권한이 없습니다." });
    }

    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await imageService.getImage(productId);

    return res.status(200).json({ message: "IMAGE_GOT", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//이미지 삭제
const deleteImage = async (req, res) => {
  try {
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken[0].status != 1) {
      return res.status(400).json({ message: "관리자 권한이 없습니다." });
    }
    const imageId = req.params.imageId;

    if (!imageId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await imageService.deleteImage(imageId);

    return res.status(200).json({ message: "IMAGE_DELETED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//이미지 수정
const updateImage = async (req, res) => {
  try {
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken[0].status != 1) {
      return res.status(400).json({ message: "관리자 권한이 없습니다." });
    }
    const imageId = req.params.imageId;
    const imageSource = req.body.imageSource;
    console.log(imageSource);
    if (imageSource.length == 0) {
      return res
        .status(400)
        .json({ message: "수정될 이미지 주소값이 존재하지 않습니다" });
    }
    const result = await imageService.updateImage(imageId, imageSource);

    return res.status(200).json({ message: "IMAGE_UPDATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createImage,
  getImage,
  deleteImage,
  updateImage,
};

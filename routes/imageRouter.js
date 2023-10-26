const express = require("express");
const imageController = require("../controller/imageController");

const router = express.Router();

router.post("/image", imageController.createImage); //이미지 등록
router.get("/image/:productId", imageController.getImage); //특정 이미지 조회
router.delete("/image/:imageId", imageController.deleteImage); // 이미지 삭제
router.put("/image/:imageId", imageController.updateImage); //이미지 수정

module.exports = {
  router,
};

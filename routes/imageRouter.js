const express = require("express");
const imageController = require("../controller/imageController");

const router = express.Router();

router.get("", imageController.getImageByDesc); //이미지 Desc로 이미지 조회
router.post("/", imageController.createImage); //이미지 등록
router.get("/:imageId", imageController.getImageById); //이미지 아이디로 이미지 조회
router.delete("/:imageId", imageController.deleteImage); // 이미지 삭제
router.put("/:imageId", imageController.updateImage); //이미지 수정

module.exports = {
  router,
};

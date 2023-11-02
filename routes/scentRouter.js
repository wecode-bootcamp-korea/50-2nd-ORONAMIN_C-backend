const express = require("express");
const scentController = require("../controller/scentController");

const router = express.Router();

router.get("", scentController.getAllScent); // 전체 향 조회
router.get("/:scentId", scentController.getScent); //특정 향 조회
router.post("", scentController.createScent); //향 생성
router.delete("/:scentId", scentController.deleteScent); //향 삭제
router.put("/:scentId", scentController.updateScent); //향 수정

module.exports = {
  router,
};

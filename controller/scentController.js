const scentService = require("../services/scentService");
const middleJwt = require("../middleware/jwt");
const error = require("../middleware/error");

//전체 향 조회
const getAllScent = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const result = await scentService.getAllScent();
    return res.status(200).json({ message: "All_SCENT_LOAED", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//특정 향 조회
const getScent = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const scentId = req.params.scentId;
    const result = await scentService.getScent(scentId);
    return res.status(200).json({ message: "SCENT_LOADED", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//향 생성
const createScent = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const { scentName, scentDesc } = req.body;

    if (!scentName || !scentDesc) {
      error.error(400, "KEY_ERROR");
    }
    await scentService.createScent(scentName, scentDesc);

    return res.status(200).json({ message: "SCENT_CREATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//향 삭제
const deleteScent = async (req, res) => {
  try {
    //관리자 여부 조회
    await error.unathorizationError(req); //관리자 여부 조회
    const scentId = req.params.scentId;

    await scentService.deleteScent(scentId);

    return res.status(200).json({ message: "SCENT_DELETED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
//향 수정
const updateScent = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const scentId = req.params.scentId;
    const { scentName, scentDesc } = req.body;

    if (!scentName || !scentDesc) {
      error.error(400, "KEY_ERROR");
    }
    const result = await scentService.updateScent(
      scentId,
      scentName,
      scentDesc
    );
    return res.status(200).json({ message: "SCENT_UPDATED", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = {
  getAllScent,
  getScent,
  createScent,
  deleteScent,
  updateScent,
};

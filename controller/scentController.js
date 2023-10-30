const scentService = require("../services/scentService");
const middleJwt = require("../middleware/jwt");

//전체 향 조회
const getAllScent = async (req, res) => {
  try {
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
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
    const scentId = req.params.scentId;
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
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
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
    const { scentName, scentDesc } = req.body;

    if (!scentName || !scentDesc) {
      return res.status(400).json({ message: "KEY_ERROR" });
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
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
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
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
    const scentId = req.params.scentId;
    const { scentName, scentDesc } = req.body;

    if (!scentName || !scentDesc) {
      return res.status(400).json({ message: "KEY_ERROR" });
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

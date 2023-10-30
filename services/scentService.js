const scentDao = require("../models/scentDao");

//전체 향 조회
const getAllScent = async () => {
  return await scentDao.getAllScent();
};

//특정 향 조회(해당 함수에 name 값만 받아 이름으로도 조회할 수 있나?)
const getScent = async (scentId) => {
  //향 존재 여부 확인
  const result = await scentDao.getScent(scentId);

  if (result.length == 0) {
    const err = new Error("존재하지 않는 향입니다");
    err.statusCode = 400;
    throw err;
  }
  return result;
};

// 향 생성
const createScent = async (scentName, scentDesc) => {
  //향 이름 중복 확인
  const checkName = await scentDao.callMeByYourName(scentName);
  if (checkName.length !== 0) {
    const err = new Error("이미 존재하는 향입니다");
    err.statusCode = 400;
    throw err;
  }
  return await scentDao.createScent(scentName, scentDesc);
};

//향 삭제
const deleteScent = async (scentId) => {
  //향 존재 여부 확인
  const checkScentId = await scentDao.getScent(scentId);
  if (checkScentId.length == 0) {
    const err = new Error("존재하지 않는 향입니다");
    err.statusCode = 400;
    throw err;
  }
  return await scentDao.deleteScent(scentId);
};
//향 수정
const updateScent = async (scentId, scentName, scentDesc) => {
  //향 존재 여부 확인
  const checkScentId = await scentDao.getScent(scentId);
  if (checkScentId == 0) {
    const err = new Error("존재하지 않는 향입니다");
    err.statusCode = 400;
    throw err;
  } //향 이름 중복 확인
  const checkName = await scentDao.callMeByYourName(scentName);

  if (checkName.length !== 0) {
    const err = new Error("수정하려는 이름이 이미 존재합니다");
    err.statusCode = 400;
    throw err;
  }

  return await scentDao.updateScent(scentId, scentName, scentDesc);
};
module.exports = {
  getAllScent,
  getScent,
  createScent,
  deleteScent,
  updateScent,
};

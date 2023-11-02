const brandDao = require("../models/brandDao");
const error = require("../middleware/error");

//전체 브랜드 조회
const getAllBrands = async () => {
  return await brandDao.getAllBrands();
};

//특정 브랜드 조회
const getBrand = async (brandId) => {
  //브랜드 존재여부 확인
  const checkBrandId = await brandDao.getBrand(brandId);
  if (checkBrandId.length == 0) {
    error.error(400, "존재하지 않는 브랜드입니다.");
  }

  return checkBrandId;
};

//브랜드 생성
const createBrand = async (brandName, brandLogo) => {
  //브랜드 이름 중복 확인
  const checkBrandName = await brandDao.getBrandByName(brandName);
  if (checkBrandName.length !== 0) {
    error.error(400, "이미 존재하는 브랜드입니다");
  }
  return await brandDao.createBrand(brandName, brandLogo);
};

//브랜드 삭제
const deleteBrand = async (brandId) => {
  //브랜드 존재여부 확인
  const checkBrandId = await brandDao.getBrand(brandId);
  if (checkBrandId.length == 0) {
    error.error(400, "존재하지 않는 브랜드입니다.");
  }
  return await brandDao.deleteBrand(brandId);
};

//브랜드 수정
const updateBrand = async (brandId, brandName, brandLogo) => {
  //브랜드 존재여부 확인
  const checkBrandId = await brandDao.getBrand(brandId);
  if (checkBrandId.length == 0) {
    error.error(400, "존재하지 않는 브랜드입니다.");
  }
  //브랜드 이름 중복 확인
  const checkBrandName = await brandDao.getBrandByName(brandName);
  if (checkBrandName.length !== 0) {
    error.error(
      400,
      "수정하려는 브랜드 이름이 이미 존재하는 브랜드 이름입니다"
    );
  }
  return await brandDao.updateBrand(brandId, brandName, brandLogo);
};

module.exports = {
  getAllBrands,
  getBrand,
  createBrand,
  deleteBrand,
  updateBrand,
};

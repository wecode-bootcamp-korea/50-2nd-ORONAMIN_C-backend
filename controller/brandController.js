const brandService = require("../services/brandService");
const middleJwt = require("../middleware/jwt");
const error = require("../middleware/error");

//전체 브랜드 조회
const getAllBrands = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회

    const result = await brandService.getAllBrands();
    return res.status(200).json({ message: "ALL_BRANDS_LOADED", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//특정 브랜드 조회
const getBrand = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회

    const brandId = req.params.brandId;
    const result = await brandService.getBrand(brandId);
    return res.status(200).json({ message: "BRAND_LOADED", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//브랜드 생성
const createBrand = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회

    const { brandName, brandLogo } = req.body;
    if (!brandName || !brandLogo) {
      error.error(400, "KEY_ERROR");
    }
    const result = await brandService.createBrand(brandName, brandLogo);
    return res.status(200).json({ message: "BRAND_CREATED", result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//브랜드 삭제

const deleteBrand = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회

    const brandId = req.params.brandId;
    await brandService.deleteBrand(brandId);
    return res.status(200).json({ message: "BRAND_DELETED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//브랜드 수정
const updateBrand = async (req, res) => {
  try {
    await error.unathorizationError(req); //관리자 여부 조회
    const brandId = req.params.brandId;
    const { brandName, brandLogo } = req.body;
    if (!brandName || !brandLogo) {
      error.error(400, "KEY_ERROR");
    }
    await brandService.updateBrand(brandId, brandName, brandLogo);
    return res.status(200).json({ message: "BRAND_UPDATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getAllBrands,
  getBrand,
  createBrand,
  deleteBrand,
  updateBrand,
};

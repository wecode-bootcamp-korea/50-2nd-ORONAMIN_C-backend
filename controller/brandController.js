const brandService = require("../services/brandService");

//전체 브랜드 조회
const getAllBrands = async (req, res) => {
  try {
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
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
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
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
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
    const { brandName, brandLogo } = req.body;
    if (!brandName || !brandLogo) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await brandService.createBrand(brandName, brandLogo);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//브랜드 삭제

const deleteBrand = async (req, res) => {
  try {
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
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
    //관리자 여부 조회
    const token = req.headers.authorization.substr(7);
    const verifiedToken = await middleJwt.verifyToken(token);

    if (verifiedToken.status != 1) {
      return res.status(404).json({ message: "관리자 권한이 없습니다" });
    } //
    const brandId = req.params.brandId;
    const { brandName, brandLogo } = req.body;
    if (!brandName || !brandLogo) {
      return res.status(400).json({ message: "KEY_ERROR" });
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

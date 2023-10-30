const { appDataSource } = require("./datasource"); // (../models/datasource)가 아닌 이유는 무엇인가요?

//전체 브랜드 조회
const getAllBrands = async () => {
  return await appDataSource.query(`
    SELECT * FROM brands`);
};
//브랜드 아이디로 브랜드 조회
const getBrand = async (brandId) => {
  return await appDataSource.query(
    `
    SELECT * FROM brands WHERE id = ?`,
    [brandId]
  );
};

//브랜드 이름으로 브랜드 조회
const getBrandByName = async (brandName) => {
  return await appDataSource.query(
    `
    SELECT * FROM brands WHERE name =?`,
    [brandName]
  );
};

//브랜드 생성
const createBrand = async (brandName, brandLogo) => {
  return await appDataSource.query(
    `
    INSERT INTO brands (name, logo)VALUES(?,?)`,
    [brandName, brandLogo]
  );
};
//브랜드 삭제
const deleteBrand = async (brandId) => {
  return await appDataSource.query(
    `
    DELETE FROM brands WHERE id =?`,
    [brandId]
  );
};
//브랜드 수정
const updateBrand = async (brandId, brandName, brandLogo) => {
  return await appDataSource.query(
    `
    UPDATE brands SET name =?, logo =? WHERE ID = ? `,
    [brandName, brandLogo, brandId]
  );
};

module.exports = {
  getAllBrands,
  getBrand,
  getBrandByName,
  createBrand,
  deleteBrand,
  updateBrand,
};

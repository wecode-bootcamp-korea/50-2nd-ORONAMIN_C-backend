const { appDataSource } = require("./datasource");

//전체 향 조회
const getAllScent = async () => {
  return await appDataSource.query(`
    SELECT * FROM scents 
    `);
};
//특정 향 조회
const getScentById = async (scentId) => {
  return await appDataSource.query(
    `
    SELECT * FROM scents WHERE id = ?
   `,
    [scentId]
  );
};

//특정 향 이름별 조회
const getScentByName = async (scentName) => {
  return await appDataSource.query(`SELECT * FROM scents WHERE name = ?`, [
    scentName,
  ]);
};

//향 생성
const createScent = async (scentName, scentDesc) => {
  return await appDataSource.query(
    `
    INSERT INTO scents (name, scent_desc) VALUES (?,?)`,
    [scentName, scentDesc]
  );
};

//향 삭제
const deleteScent = async (scentId) => {
  return await appDataSource.query(
    `
    DELETE FROM scents WHERE id = ?`,
    [scentId]
  );
};

//향 수정
const updateScent = async (scentId, scentName, scentDesc) => {
  return await appDataSource.query(
    `
    UPDATE scents SET name = ? , scent_desc =? WHERE id=?`,
    [scentName, scentDesc, scentId]
  );
};

module.exports = {
  getAllScent,
  getScentById,
  createScent,
  getScentByName,
  deleteScent,
  updateScent,
};

const middleJwt = require("../middleware/jwt");

const error = (statusCode, message) => {
    const err = new Error( message )
    err.statusCode = statusCode;
    throw err
}

const unathorizationError = async (req) => {
  const token = req.headers.authorization.substr(7);
  const verifiedToken = await middleJwt.verifyToken(token);
  if (verifiedToken.status != 1) {
    const error = new Error("관리자 권한이 없습니다");
    error.statusCode = 403;
    throw error;
  }
};

module.exports = {
  error,
  unathorizationError,
};
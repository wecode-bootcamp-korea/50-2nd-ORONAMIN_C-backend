const productService = require("../services/productService");
const middleJwt = require("../middleware/jwt");

const productAll = async (req, res) => {
  try {
    const { brandName, scentName } = req.query;
    const products = await productService.getProducts(brandName, scentName);
    res.status(200).json({ products });
  } catch (err) {
    res.status(statusCode || 500).json({ message: err.message });
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productService.getProduct(id);
    res.status(200).json({ product });
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};
const createProduct = async (req, res) => {
  const { productName, price, description, brandId, scentId, imageId } =req.body;
  const token = req.headers.authorization.substr(7);
  const decodedToken = await middleJwt.verifyToken(token);
  try {
    if (!productName ||!price ||!description ||!brandId ||!scentId ||!imageId) {
      const inputKeyError = new Error();
      inputKeyError.statusCode = 400;
      inputKeyError.message = "INPUT_KEY_ERROR";
      throw inputKeyError;
    }
    if (token) {
      const userType = {
        ADMIN: 1,
      };
      if (decodedToken.status === userType.ADMIN) {
        await productService.createProduct(productName,price,description,brandId,scentId,imageId);
        res.status(200).json({ message: "successfully created" });
      } else {
        const err = new Error();
        err.statusCode = 401;
        err.message = "Permission Denied";
        throw err;
      }
    }
  } catch (err) {
    res.status(statusCode ||404 ).json({ message: err.message });
  }
};
const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { productName, price, description, brandId, scentId, imageId } =
    req.body;
  const token = req.headers.authorization.substr(7);
  const decodedToken = await middleJwt.verifyToken(token);
  try {
    if (token) {
      const userType = {
        ADMIN: 1,
      };
      if (decodedToken.status === userType.ADMIN) {
        await productService.updateProduct(
          productId,
          productName,
          price,
          description,
          brandId,
          scentId,
          imageId
        );
        res.status(200).json({ message: "successfully updated" });
      } else {
        const err = new Error();
        err.statusCode = 401;
        err.message = "Permission Denied";
        throw err;
      }
    }
  } catch (err) {
    res.status(statusCode ||500).json({ message: err.message });
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization.substr(7);
  const decodedToken = await middleJwt.verifyToken(token);
  try {
    if (token) {
      const userType = {
        ADMIN: 1,
      };
      if (decodedToken.status === userType.ADMIN)
        await productService.deleteProduct(id);
      res.status(204).json({ message: "삭제되었습니다." });
    } else {
      const err = new Error();
      err.statusCode = 401;
      err.message = "Permission Denied";
      throw err;
    }
  } catch (err) {
    res.status(statusCode404 || 404 ).json({ message: err.message });
  }
};

module.exports = {
  productAll,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};

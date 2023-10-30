const express = require("express");
const brandController = require("../controller/brandController");

const router = express.Router();

router.get("/brand", brandController.getAllBrands);
router.get("/brand/:brandId", brandController.getBrand);
router.post("/brand", brandController.createBrand);
router.delete("/brand/:brandId", brandController.deleteBrand);
router.put("/brand/:brandId", brandController.updateBrand);

module.exports = {
  router,
};

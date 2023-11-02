const express = require("express");
const brandController = require("../controller/brandController");

const router = express.Router();

router.get("", brandController.getAllBrands);
router.get("/:brandId", brandController.getBrand);
router.post("/", brandController.createBrand);
router.delete("/:brandId", brandController.deleteBrand);
router.put("/:brandId", brandController.updateBrand);

module.exports = {
  router,
};

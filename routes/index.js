//routes/index.js
const express = require("express");
const router = express.Router();
const imageRouter = require("./imageRouter");
const scentRouter = require("./scentRouter");
const brandRouter = require("./brandRouter");

router.use("/products", imageRouter.router);
router.use("/products", scentRouter.router);
router.use("/products", brandRouter.router);

module.exports = router;

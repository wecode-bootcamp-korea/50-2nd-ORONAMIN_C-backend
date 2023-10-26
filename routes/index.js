//routes/index.js
const express = require("express");
const router = express.Router();
const imageRouter = require("./imageRouter");
// const scentRouter = require("./scentRouter");

router.use("/products", imageRouter.router);
// router.use("/products", scentRouter.router);

module.exports = router;

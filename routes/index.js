
//routes/index.js
const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter")
//향,브랜드, 이미지 라우터로 가는 입구
const imageRouter = require("./imageRouter");
const scentRouter = require("./scentRouter");
const brandRouter = require("./brandRouter");
const orderRouter = require("./orderRouter");
/// 유저,포스트 라우터로 가는 입구
const userRouter = require('./userRouter')

router.use('/users', userRouter)
router.use("/images", imageRouter.router);
router.use("/scents", scentRouter.router);
router.use("/brands", brandRouter.router);
router.use("/products",productRouter.router)

module.exports = router;


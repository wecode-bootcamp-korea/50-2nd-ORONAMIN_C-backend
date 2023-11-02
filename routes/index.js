
const express = require("express");
const router = express.Router();

const imageRouter = require("./imageRouter");
const scentRouter = require("./scentRouter");
const brandRouter = require("./brandRouter");
const orderRouter = require("./orderRouter");
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter');

router.use('/users', userRouter)
router.use("/images", imageRouter.router);
router.use("/scents", scentRouter.router);
router.use("/brands", brandRouter.router);
router.use('/orders', orderRouter)


module.exports = router;


//routes/index.js
const express = require("express");
const router = express.Router();
const orderRouters = require('./orderRouters');
router.use('/orders', orderRouters.router)
module.exports = router;
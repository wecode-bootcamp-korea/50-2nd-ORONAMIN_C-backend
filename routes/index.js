//routes/index.js
const express = require("express");
const router = express.Router();
const orderRouters = require('./orderRouters');


router.use('/users', orderRouters.router)



module.exports = router;
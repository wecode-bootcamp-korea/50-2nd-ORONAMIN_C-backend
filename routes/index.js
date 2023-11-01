//routes/index.js
const express = require("express");
const router = express.Router();
const orderRouters = require('./orderRouters');
const cors = require('cors')
const app = express();

app.use(cors());

router.use('/users', orderRouters.router)



module.exports = router;
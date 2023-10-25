const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/list', userController.list);
router.post('/point', userController.addPoint);

module.exports = router;
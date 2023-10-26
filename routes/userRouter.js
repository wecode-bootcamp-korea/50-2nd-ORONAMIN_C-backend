const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/signup', userController.signUp);      // 회원가입
router.post('/signin', userController.signIn);      // 로그인
router.get('/list', userController.list);           // 회원 전체 리스트
router.get('/:userEmail', userController.oneList);  // 특정 회원 리스트
router.post('/point', userController.addPoint);     // 회원 포인트 충전

module.exports = router;
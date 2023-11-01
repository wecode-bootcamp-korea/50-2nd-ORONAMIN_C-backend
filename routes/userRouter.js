const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/signup', userController.signUp);                      // 회원가입
router.post('/signin', userController.signIn);                      // 로그인
router.get('/info/list', userController.list);                      // 회원 전체 리스트
router.get('/info', userController.oneList);                        // 특정 회원 리스트

// router.post('/auth', userController.auth);                          // 메일 본인 인증//

router.put('/find/password', userController.findPassword);          // 비밀번호 재발급
router.put('/point', userController.addPoint);                      // 회원 포인트 충전
router.put('/info', userController.changeUserInfo)                  // 회원정보 수정

module.exports = router;
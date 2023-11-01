const express = require('express')
const router = express.Router()

/// 유저,포스트 라우터로 가는 입구
const userRouter = require('./userRouter')
router.use('/users', userRouter)

module.exports = router 
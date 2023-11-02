const bcrypt = require('bcrypt')

/// 패스워드를 입력하면 자동으로 salt rounds 10으로 패스워드를 해쉬해주는 함수
const hash = async (password) => {
    return await bcrypt.hash(password,10)
}

const validation = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hash, validation }


const bcrypt = require('bcrypt')

/// 패스워드를 입력하면 자동으로 salt rounds 10으로 패스워드를 해쉬해주는 함수
const hash = async (password) => {
    return await bcrypt.hash(password,10)
}

// 입력받은 패스워드와 저장된 패스워드를 입력해주면 일치하는지 확인해주는 함수
const validation = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hash, validation }
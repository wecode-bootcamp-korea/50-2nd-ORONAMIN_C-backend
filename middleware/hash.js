const bcrypt = require('bcrypt')

const hash = async (password) => {
    return await bcrypt.hash(password,10)
}

const validation = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hash, validation }
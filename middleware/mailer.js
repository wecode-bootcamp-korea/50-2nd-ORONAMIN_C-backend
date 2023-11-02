const nodemailer = require('nodemailer')
const dotenv = require("dotenv")

// 받는 사람의 메일과, 생성된 코드를 입력하면 메일을 발신하는 함수
const sendEmail = async( userEmail, verifyNumber ) => {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.TYPEORM_EMAIL_USER,
            pass : process.env.TYPEORM_EMAIL_PASS
        }
    })

    const result = await transporter.sendMail({
        from : '',
        to : `${userEmail}`,
        subject : 'SURF 회원가입을 위한 본인 인증 메일입니다.',
        html : `
        <style>
            .color {color: #8b00ff}
        </style>
        <div> 아래 인증 번호를 입력하여 본인 인증을 해주시기 바랍니다. </div>
        <div> 인증번호 : <span class = color>${verifyNumber}</span> </div>
        `
    })
    console.log(result)
}

module.exports = { sendEmail }
const nodemailer = require("nodemailer");
require("dotenv").config();

const {USER_EMAIL, USER_PASSWORD} = process.env;

async function enviarEmail (email, url) {
    const transportador = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: USER_EMAIL,
            pass: USER_PASSWORD
        }
    });
    await transportador.sendMail({
        from: USER_EMAIL,
        to: email,
        subject: `Verificar email`,
        text: `Clique no link para verificar seu email ${url}`
        
    });

}

module.exports = { enviarEmail }
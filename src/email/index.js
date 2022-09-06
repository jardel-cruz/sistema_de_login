const nodemailer = require("nodemailer");

async function enviarEmail (email, url) {
    const contaTeste = await nodemailer.createTestAccount();
    const transportador = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: contaTeste
    });
    const resultado = await transportador.sendMail({
        from: "jardel@jardel333.com.br",
        to: email,
        subject: `Verificar email`,
        text: `Clique no link para verificar seu email ${url}`
        
    });

    console.log("URL:" + nodemailer.getTestMessageUrl(resultado))

}

module.exports = { enviarEmail }
const { enviarEmail } = require("../../../email")

async function emailDeVerificacao (destino, urlUnica) {
    try {
        const url = urlUnica;
        enviarEmail(destino, url);
    } catch (error) {
        throw new Error("Error ao enviar o email");
    }
}

module.exports = emailDeVerificacao
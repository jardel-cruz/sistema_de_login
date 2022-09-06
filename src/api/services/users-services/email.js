const { enviarEmail } = require("../../../email")

async function emailDeVerificacao (destino, dominio, id) {
    try {
        const url = `http://${dominio}/verificar_email/${id}`;
        enviarEmail(destino, url);
    } catch (error) {
        throw new Error("Error ao enviar o email");
    }
}

module.exports = emailDeVerificacao
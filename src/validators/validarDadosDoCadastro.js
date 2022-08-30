async function validarDados (dados) {
    try {
        if (typeof dados != Object) throw new Error("Isso não é um obijeto");

        const keys = new Object.keys(dados);

        if (keys.length < 4) throw new Error("Falta dados");

        const values = new Object.values(dados);

        if (values.includes(undefined)) throw new Error("Valores invalidos");

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = validarDados
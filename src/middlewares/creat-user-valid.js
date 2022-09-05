async function emailValide (email) {
    try {
        const regx = /\S+@\S+\.\S+/;
        return regx.test(email);
    } catch (error) {
        throw new Error("Erro ao validar email");
    }
}

module.exports = async (req, res, next) => {
    try {
        const { nome, idade, email, senha } = req.body;

        const nomeTamanho = typeof nome === "string" && nome.length > 5;
        const idadeTamanho = typeof idade === "number" && idade >= 18;
        const emailResult = await emailValide(email);
        const senhaTamanho = typeof senha === "string" && senha.length > 5; 

        const arrayValidacoes = [
            ["Nome", nomeTamanho],
            ["Idade", idadeTamanho],
            ["Email", emailResult],
            ["Senha", senhaTamanho],
        ];

        const result = [];

        arrayValidacoes.forEach(value => {
            if (value[1] !== true) result.push(`O campo ${value[0]} esta invalido`);
        })

        if ( result.length > 0 ) return res.status(400).json({ msg: result });

        next()
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
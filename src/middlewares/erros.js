async function erro404 (req, res) {
    return res.status(404).json({ msg: "Essa rota não existe" });
}

const erroFatal = (err, req, res) => {
    console.log(err.stack);

    return res.status(500).json({ err: "Aconteceu um erro inesperado." });
}

module.exports = {erroFatal, erro404}
async function cabecalhoDaResposta (req, res, next) {
    res.set("X-Powered-By", "PHP/7.1.7");

    next();
}

module.exports = {cabecalhoDaResposta}
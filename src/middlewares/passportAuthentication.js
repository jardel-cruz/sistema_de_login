const passport = require("passport");

const tratarErros = {
    JsonWebTokenError: async (req, res) => {
        res.status(401).json({ msg: "Token invalido" });
    },

    TokenExpiredError: async (req, res) => {
        res.status(401).json({ msg: "Token expirado" });
    }
}

async function bearer (req, res, next) {
    passport.authenticate(
        "bearer",
        { session: false },
        (erro, usuario) => {
            if (erro) {
                return tratarErros[erro.name](req, res);
            }

            if (!usuario) {
                return res.status(500).json({ msg: "Erro ao buscar o usuario" });
            }

            req.user = usuario;

            return next();
        }

    )(req, res, next)
}

module.exports = {bearer}
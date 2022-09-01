const transacaoServices = require("../services/transacao-services");

module.exports = {
    historicoUsuario: async (req, res) => {
        try {
            const { id } = req.user
            const historico = await transacaoServices.historico(id);

            res.status(200).json(historico);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    depositarQuantia: async (req, res) => {
        try {
            const usuario = await transacaoServices.deposito(req.user, req.body);

            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    sacarQuantia: async (req, res) => {
        try {
            const usuario = await transacaoServices.saque(req.user, req.body);

            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
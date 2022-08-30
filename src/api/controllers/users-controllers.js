const userServices = require("../services/users-services");

module.exports = {
    criarConta: async (req, res) => {
        try {
            console.log(req.body)
            const usuario = await userServices.criarUsuario(req.body);

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    login: async (req, res) => {
        try {
            const usuario = req.user;
            const token = await userServices.logarUsuario(usuario.id);

            res.set({ Authorization: token });
            return res.status(200).json({ status: "Logado" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    teste: async (req, res) => {
        try {
            const usuario = req.user;

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
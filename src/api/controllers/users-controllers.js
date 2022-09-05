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
            const { id } = req.user;
            const { accesToken, refreshToken } = await userServices.logarUsuario(id);

            res.set({ Authorization: accesToken });
            return res.status(200).json({ refreshToken });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    logout: async (req, res) => {
        try {
            const { token } = req.authInfo;
            await userServices.logoutDoUsuario(token);

            return res.status(201).json({ msg: "Logout concluido!" });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    teste: async (req, res) => {
        try {
            return res.status(200).json({ msg: true });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
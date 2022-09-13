function autorizacao (cargosObrigatorios = []) {
    return async (req, res, next) => {
        const { cargo } = req.user;

        if (cargosObrigatorios.includes(cargo) !== true) {

            return res.status(400).json({ msg: "Você não esta autorizado" })
        } else if (cargosObrigatorios.includes(cargo)) {
            
            return next();
        }

        return res.status(500).json({ msg: "Algo deu errado" });
    }
}

module.exports = autorizacao
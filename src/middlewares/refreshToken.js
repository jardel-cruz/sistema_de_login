const { allowList } = require("../api/redis/allow-list");

async function validaRefreshToken (refreshToken) {
    try {
        if (!refreshToken) {
            throw new Error("Refreshe Token invalido");
        }

        const id = await allowList.getToken(refreshToken);

        if (!id) {
            throw new Error("Refreshe Token invalido");
        }

        return id
    } catch (error) {
        throw new Error(error.message);
    }
}

async function invalidarRefreshToken (refreshToken) {
    try {
        const excluirToken = await allowList.excludeToken(refreshToken);

        return excluirToken
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const id = await validaRefreshToken(refreshToken);
        await invalidarRefreshToken(refreshToken);

        req.user = { id };

        return next()
    } catch (error) {
        res.json(error.message);
    }
}
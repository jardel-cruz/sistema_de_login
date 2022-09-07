const { randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = {
    access: {
        async accessTokenGenerate (id, securiteKey, expires) {
            const payload = { id: id };
            const token = jwt.sign(payload, securiteKey, {expiresIn: expires});
        
            return token;
        }
    },

    refresh: {
        async gerarRefreshToken () {
            try {
                const token = randomBytes(25).toString("hex");
        
                return token;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
}




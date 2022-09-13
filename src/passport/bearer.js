const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { blockList } = require("../api/redis/block-list");
const repositorio = require("../api/repositories/mysql")

const sql = repositorio("Users");

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const logout = await blockList.existsToken(token);

                if (logout === true) throw new Error("Tokem logout");
                
                const securetKey = process.env.SECURET_KEY;
                const { id } = jwt.verify(token, securetKey);

                const usuario = await sql.buscarId(id);

                if (!usuario) throw new Error("Erro de acesso"); 

                return done(null, usuario, {token: token});
            } catch (error) {
                done(error);
            }
        }
    )
);

module.exports = passport
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const {Redis} = require("../api/redis/client");
const mysql = require("../api/repositories/mysql");

const redis = Redis();
const sql = mysql("Users");

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const logout = await redis.getToken(token);

                if (logout === true) throw new Error("Tokem logout");
                
                const securetKey = process.env.SECURET_KEY;
                const payload = jwt.verify(token, securetKey);
                const usuario = await sql.buscarId(Number(payload.id));


                return done(null, usuario, {token: token});
            } catch (error) {
                done(error);
            }
        }
    )
);

module.exports = passport
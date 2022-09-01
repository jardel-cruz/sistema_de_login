const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const mysql = require("../api/repositories/mysql");
const mongooseQuerys = require("../api/repositories/mongoDB");

const mongoDb = mongooseQuerys();
const sql = mysql("Users");

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "senha",
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await sql.busacarUm({ email: email });
            const securet = (await mongoDb.buscar(usuario.securet)).senha;

            const verificacao = await bcrypt.compare(senha, securet);

            if (verificacao !== true) throw new Error("Credenciais invalidas");

            return done(null, usuario);
        } catch (error) {
            done(error);
        }
    })
)

module.exports = passport
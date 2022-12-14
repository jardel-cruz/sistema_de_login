const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const mongooseQuerys = require("../repositories/mongoDB");
const mysql = require("../repositories/mysql");
const { Redis } = require("../../api/redis/client");

const mongoDb = mongooseQuerys();
const sql = mysql("Users");
const redis = Redis();

//funções =========================================================================================================//

async function gerarSenhaHash (senha) {
    const hash = await bcrypt.hash(senha, 12);

    return hash
}

async function gerarToken (id, securetKey, expires) {
    const payload = { id: id };
    const token = jwt.sign(payload, securetKey, {expiresIn: expires});

    return token;
}

//==================================================================================================================//

module.exports = {
    criarUsuario: async (dados) => {
        try {

            const { nome, idade, email, senha } = dados;
            const senhaHash = await gerarSenhaHash(senha);
            const dadosSecurite = await (await mongoDb.criar({ senha: senhaHash })).id;

            const dadosUsuario = {
                nome: nome,
                idade: idade,
                saldo: 0,
                email: email,
                securet: dadosSecurite
            };

            const usuario = await sql.criarUm(dadosUsuario);

            return usuario;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    logarUsuario: async (usuarioId) => {
        try {
            const securetKey = process.env.SECURET_KEY;
            const token = await gerarToken(Number(usuarioId), securetKey, "5m");

            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    logoutDoUsuario: async (token) => {
        try {
            const resultado = await redis.setToken(token);

            return resultado;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
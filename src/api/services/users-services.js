const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const moment = require("moment");
const dotenv = require("dotenv").config();
const mongooseQuerys = require("../repositories/mongoDB");
const mysql = require("../repositories/mysql");
const { blockList } = require("../redis/block-list");
const { allowList } = require("../redis/allow-list");


const mongoDb = mongooseQuerys();
const sql = mysql("Users");

//funções =========================================================================================================//

async function gerarSenhaHash (senha) {
    const hash = await bcrypt.hash(senha, 12);

    return hash
}

async function accesTokenGenerete (id, securetKey, expires) {
    const payload = { id: id };
    const token = jwt.sign(payload, securetKey, {expiresIn: expires});

    return token;
}

async function gerarRafreshToken (usuarioId) {
    try {
        const token = randomBytes(25).toString("hex");
        const expireAt = moment().add(5, "days").unix();
        await allowList.setToken(token, usuarioId, expireAt);

        return token;
    } catch (error) {
        throw new Error(error.message);
    }
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
            const accesToken = await accesTokenGenerete(usuarioId, securetKey, "15m");
            const refreshToken = await gerarRafreshToken(usuarioId);

            return {accesToken, refreshToken};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    logoutDoUsuario: async (token) => {
        try {
            const expireAt = moment().add(15, "minutes").unix()
            const resultado = await blockList.setToken(token, "", expireAt);

            return resultado;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
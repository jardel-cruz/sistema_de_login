const bcrypt = require("bcrypt");
const moment = require("moment");
const dotenv = require("dotenv").config();
const mongooseQuerys = require("../../repositories/mongoDB");
const mysql = require("../../repositories/mysql");
const { blockList } = require("../../redis/block-list");
const { allowList } = require("../../redis/allow-list");
const { access, refresh } = require("./tokens");
const emailDeVerificacao = require("./email");

const mongoDb = mongooseQuerys();
const sql = mysql("Users");

module.exports = {
    criarUsuario: async (dados) => {
        try {

            const { nome, idade, email, senha } = dados;
            const senhaHash = await bcrypt.hash(senha, 12);
            const dadosSecurite = await (await mongoDb.criar({ senha: senhaHash })).id;
            
            const dadosUsuario = {
                nome: nome,
                idade: idade,
                saldo: 0,
                email: email,
                securet: dadosSecurite
            };
            
            const usuario = await sql.criarUm(dadosUsuario);
            
            const dominio = process.env.DOMINIO;
            emailDeVerificacao(email, dominio, usuario.id)

            return usuario;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    logarUsuario: async (usuarioId) => {
        try {
            const securetKey = process.env.SECURET_KEY;
            const expireAt = moment().add(5, "days").unix();
            const accessToken = await access.accessTokenGenerate(usuarioId, securetKey, "15m");
            const refreshToken = await refresh.gerarRefreshToken(usuarioId);
            await allowList.setToken(refreshToken, usuarioId, expireAt);

            return {accessToken: accessToken, refreshToken};
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
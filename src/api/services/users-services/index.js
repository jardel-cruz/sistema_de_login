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
                email_verificado: false,
                securet: dadosSecurite
            };
            
            const usuario = await sql.criarUm(dadosUsuario);
            
            const dominio = process.env.DOMINIO;

            const tokenUrl = await refresh.gerarRefreshToken();
            await allowList.setToken(tokenUrl, usuario.id);
            
            const url = `http://${dominio}/users/verificar_email/${tokenUrl}`;

            await emailDeVerificacao(email, url)

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
    },

    emailVerificado: async (token) => {
        try {
            const id = await allowList.getToken(token)

            if (!id) {
                throw new Error("Falha ao cadastrar email")
            }

            const resultado = await sql.atualizarUm({ email_verificado: true }, { id: id });

            await allowList.excludeToken(token);

            return resultado;
        } catch (error) {
            throw error;
        }
    }
}
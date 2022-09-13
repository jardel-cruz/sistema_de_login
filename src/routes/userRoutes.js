const { Router } = require("express");
const passport = require("passport");
const validarUser = require("../middlewares/creat-user-valid");
const usersControllers = require("../api/controllers/users-controllers");
const refreshToken = require("../middlewares/refreshToken");
const autorizacao = require("../middlewares/altorizacao-middleware")

const router = Router({ caseSensitive: true });

router
    .get("/users/verificar_email/:token", usersControllers.vericaEmail)
    .post("/users", validarUser ,usersControllers.criarConta)
    .post("/users/login", passport.authenticate("local", { session: false }), usersControllers.login)
    .post("/users/logout", [refreshToken, passport.authenticate("bearer", { session: false })], usersControllers.logout)
    .post("/users/atualiza_token", refreshToken, usersControllers.login)
    .get("/users/test", [passport.authenticate("bearer", { session: false }), autorizacao(["admin", "editor", "assinante"])], usersControllers.teste)

module.exports = router
const { Router } = require("express");
const passport = require("passport");

const validarUser = require("../middlewares/creat-user-valid");
const usersControllers = require("../api/controllers/users-controllers");

const router = Router({ caseSensitive: true });

router
    .post("/users/t", validarUser, usersControllers.teste)
    .post("/users",validarUser ,usersControllers.criarConta)
    .post("/users/login", passport.authenticate("local", { session: false}), usersControllers.login)
    .post("/users/logout", passport.authenticate("bearer", { session: false }), usersControllers.logout)

module.exports = router
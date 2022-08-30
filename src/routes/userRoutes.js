const { Router } = require("express");
const usersControllers = require("../api/controllers/users-controllers");
const passport = require("passport")

const router = Router({ caseSensitive: true });

router
    .post("/users", usersControllers.criarConta)
    .post("/users/login", passport.authenticate("local", { session: false}), usersControllers.login)
    .get("/users/t", passport.authenticate("bearer", { session: false }), usersControllers.teste)

module.exports = router
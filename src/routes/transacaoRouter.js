const { Router } = require("express");
const passport = require("passport");

const transacaoControllers = require("../api/controllers/transacao-controllers");

const router = Router({ caseSensitive: true });

router
    .use(passport.authenticate("bearer", { session: false }))
    .get("/tran", transacaoControllers.historicoUsuario)
    .post("/tran/deposito", transacaoControllers.depositarQuantia)
    .post("/tran/saque", transacaoControllers.sacarQuantia)


module.exports = router
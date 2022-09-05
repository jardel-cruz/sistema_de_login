const { Router } = require("express");
const transacaoControllers = require("../api/controllers/transacao-controllers");

const router = Router({ caseSensitive: true });

router
    .get("/tran", transacaoControllers.historicoUsuario)
    .post("/tran/deposito", transacaoControllers.depositarQuantia)
    .post("/tran/saque", transacaoControllers.sacarQuantia)


module.exports = router
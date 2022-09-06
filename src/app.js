const express = require("express");
const bodyParcer = require("body-parser");
const morgan = require("morgan");
const router = require("./routes");
const dbMg = require("./config/mongooseConfg");
const { socketBlockList } = require("./api/redis/block-list");
const {socketAllowList} = require("./api/redis/allow-list");
const { erro404, erroFatal } = require("./middlewares/erros");
const { cabecalhoDaResposta } = require("./middlewares/cabecalho");
const { bearer } = require("./middlewares/passportAuthentication");
const LocalStrategy = require("./passport/local");
const BearerStrategy = require("./passport/bearer");

socketBlockList();
socketAllowList();

dbMg.on("error", () => console.log("Erro de conexão com o MongoDb."));
dbMg.once("open", () => console.log("Conexão estabelecida com o MongoDb."));

const app = express();

app.use(bodyParcer.json());
app.use(bodyParcer.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/tran", bearer);
app.use(cabecalhoDaResposta);

router(app);

app.use(erro404);
app.use(erroFatal);

module.exports = app
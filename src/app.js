const express = require("express");
const bodyParcer = require("body-parser");
const router = require("./routes");
const dbMg = require("./config/mongooseConfg");
const LocalStrategy = require("./passport/local");
const BearerStrategy = require("./passport/bearer");
const { soket } = require("./api/redis/client");

soket(() => console.log("Conexão com o Redis bem sucedida"));

dbMg.on("error", console.log.bind(console, "Erro de conexão com o MongoDb."));
dbMg.once("open", () => console.log("Conexão estabelecida com o MongoDb."));

const app = express();

app.use(bodyParcer.json());
app.use(bodyParcer.urlencoded({ extended: false }));

router(app);

module.exports = app
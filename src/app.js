const express = require("express");
const bodyParcer = require("body-parser");
const router = require("./routes");
const dbMg = require("./config/mongooseConfg");

dbMg.on("error", console.log.bind(console, "Erro de conexão com o MongoDb."));
dbMg.once("open", () => console.log("Conexão estabelecida com o MongoDb."));

const app = express();

router(app);

app.use(bodyParcer.json);
app.use(bodyParcer.urlencoded({ extended: false }));

module.exports = app
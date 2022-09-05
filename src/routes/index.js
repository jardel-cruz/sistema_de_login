const users = require("./userRoutes");
const historico = require("./transacaoRouter");

module.exports = (app) => {
    app.use(users);
    app.use(historico);
}
const app = require("./src/app");
const dotenv = require("dotenv");
dotenv.config();

const porta = process.env.PORTA || 3000;

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
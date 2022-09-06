const redis = require("redis");
const manipulaClientes = require("./manipula-clientes");

const client = redis.createClient();

async function socketAllowList () {
    try {
        await client.connect();

        console.log("O cliente do Redis 'allow-list' esta conectado");
    } catch (error) {
        console.log("O cliente do Redis 'allow-list' está com problemas", error);
    }
}

const allowList = manipulaClientes(client, "allow-list:");

module.exports = {allowList, socketAllowList}

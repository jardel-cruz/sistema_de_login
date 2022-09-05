const redis = require("redis");
const manipulaClientes = require("./manipula-clientes");

const client = redis.createClient();

async function socketBlockList () {
    try {
        await client.connect();

        console.log("O cliente do Redis 'block-list' esta conectado");
    } catch (error) {
        console.log("O cliente do Redis 'block-list' esata com problemas", error);
    }
}

const blockList = manipulaClientes(client, "block-list:");

module.exports = {blockList, socketBlockList}
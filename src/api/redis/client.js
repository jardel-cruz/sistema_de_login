const redis = require("redis");

const client = redis.createClient();

async function soket (callbak) {
    try {
        await client.connect();

        callbak();
    } catch (error) {
        console.log("Erro de conexão");
    }
};

function Redis () {
    return {
        setToken: async (token) => {
            try {
                await client.set(token , "");
                await client.expire(token, 300);

                return "Ok";
            } catch (error) {
                throw new Error(error.message);
            }
        },

        getToken: async (token) => {
            try {
                const validacao = await client.exists(token);
                const status = validacao === 1 ? true : false;

                return status;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    };
    
};

module.exports = {Redis, soket}
module.exports = (cliente, prefix) => {
    return {
        setToken: async (token, conteudo, validade) => {
            try {
                const key = `${prefix} ${token}`;
                await cliente.set(key , conteudo);

                if (validade) {
                    await cliente.expireAt(key, validade);
                }

                return "Ok";
            } catch (error) {
                throw new Error(error.message);
            }
        },

        getToken: async (token) => {
            try {
                const key = `${prefix} ${token}`;
                const value = await cliente.get(key);

                return value
            } catch (error) {
                throw new Error(error.message);
            }
        },

        excludeToken: async (token) => {
            try {
                const key = `${prefix} ${token}`;
                const result = await cliente.del(key);

                return  !!result
            } catch (error) {
                throw new Error(error.message);
            }
        } ,

        existsToken: async (token) => {
            try {
                const key = `${prefix} ${token}`;
                const validacao = await cliente.exists(key);
                const status = validacao === 1;

                return status;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
}
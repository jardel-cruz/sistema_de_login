const securite = require("../../models/mongoose");

module.exports = {
    criar: async (dados) => {
        try {
            const novosDados = new securite(dados);
            await novosDados.save();

            return novosDados;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    buscar: async (id) => {
        try {
            const dados = await securite.findById(id);

            return dados;
        } catch (error) {
            throw new Error(error.message);
        }
    } 
}
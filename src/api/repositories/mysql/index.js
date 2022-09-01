const sqlModels = require("../../models/sequelize");

function sqlRequires (model) {
    const atualModel = sqlModels[model]
    
    return {
        buscarTodos: async (where = {}) => {
            try {
                const registros = await atualModel.findAll({ where: where });

                return registros;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        busacarUm: async (where) => {
            try {

                if (!where) throw new Error("Parametro obrigatorio");

                const registro = await atualModel.findOne({ where: where });

                return registro;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        buscarId: async (id) => {
            try {
                const idRegistro = id || 0;
                const registro = await atualModel.findByPk(Number(idRegistro));

                return registro;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        criarUm: async (dados) => {
            try {
                const novoRegistro = await atualModel.create(dados);

                return novoRegistro;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        atualizarUm: async (dados, id) => {
            try {
                const registro = await atualModel.update(dados, { where: id });
                
                return dados;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        deletar: async (id) => {
            try {
                return atualModel.destroy({ where: Number(id) });
            } catch (error) {
                throw new Error(error.message);
            }
        }


    }
}

module.exports = sqlRequires
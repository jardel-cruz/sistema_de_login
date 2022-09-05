const mySql = require("../repositories/mysql");
const historicos = mySql("Historicos");
const users = mySql("Users");

module.exports = {
    historico: async (user_id) => {
        try {
            const historicoUsario = await historicos.buscarTodos({ user_id: user_id });

            return historicoUsario;
        } catch (error) {
            throw new Error("Erro ao buscar o historico");

        }
    },

    deposito: async (usuario, dados = {}) => {
        try {
            const { id } = usuario;
            const transacao = {
                valor: dados.valor,
                destino: dados.destino,
                motivo: dados.motivo,
                user_id: id
            };

            const atualizarSaldo = await users.atualizarUm({ saldo: usuario.saldo + transacao.valor }, { id: id });
            const criarHistorico = await historicos.criarUm(transacao);

            return [atualizarSaldo, criarHistorico];
        } catch (error) {
            throw new Error("Erro ao realizar deposito");
        }
    },

    saque: async (usuario, dados = {}) => {
        try {
            const { id } = usuario;
            const transacao = {
                valor: dados.valor * -1,
                destino: dados.destino,
                motivo: dados.motivo,
                user_id: id
            };

            console.log(usuario.saldo + transacao.valor)

            const atualizarSaldo = await users.atualizarUm({ saldo: usuario.saldo + transacao.valor }, { id: id });
            const criarHistorico = await historicos.criarUm(transacao);

            return [atualizarSaldo, criarHistorico];
        } catch (error) {
            
        }
    },
}
const database = require("../database/connection")

class controlesController {
    ligarControle(request, response){
        const id = request.params.id
        const {comando_bomba} = request.body
        const {comando_valvula} = request.body
       

        database('ControleIrrigacao')
            .where({ id: id })
            .update({
                comando_bomba: 1,
                comando_valvula: 1
            })
            .then(data => {
                // Não envie a resposta aqui, aguarde a segunda atualização
            })
            .then(() => {
                // Agora, após ambas as atualizações, envie a resposta
                response.json({ message: "Bomba e Valvula ligadas"});
            })
            .catch(error => {
                response.json(error);
            });
    }

    desligarControle(request, response){
        const id = request.params.id
        const {comando_bomba} = request.body
        const {comando_valvula} = request.body
       

        database('ControleIrrigacao')
            .where({ id: id })
            .update({
                comando_bomba: 0,
                comando_valvula: 0
            })
            .then(data => {
                // Não envie a resposta aqui, aguarde a segunda atualização
            })
            .then(() => {
                // Agora, após ambas as atualizações, envie a resposta
                response.json({ message: "Bomba e Valvula desligadas"});
            })
            .catch(error => {
                response.json(error);
            });
    }
}

module.exports = new controlesController();

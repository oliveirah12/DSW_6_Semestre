
const ItemPatrimonioRepository = require("../repositories/ItemPatrimonioRepository");

module.exports = {
    getAllItemPatrimonio: async function (){
        const data = await ItemPatrimonioRepository.all();
        return data;
    },

    getItemPatrimonioById: async function (patrimonioId){
        const data = await ItemPatrimonioRepository.find(patrimonioId);
        return data;
    },

    addNewItemPatrimonio: async function (itemPatrimonio){
        const data = await ItemPatrimonioRepository.create(itemPatrimonio);
        if(data) return {status: "Item criado com sucesso."}
        else return {status: "Não foi possível criar o item"}
    },
    
    removeItemPatrimonioById: async function(patrimonioId) {
        const status = await ItemPatrimonioRepository.remove(patrimonioId);
        if(status) return {status: "Item removido com sucesso."}
        else return {status: "Item não encontrado."}
    }
}

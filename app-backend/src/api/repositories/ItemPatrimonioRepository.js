const database = require("../../database/TempDatabase");
const ItemPatrimonio = require("../../database/model/ItemPatrimonio");
const ItemRepoSeed = require("../../database/seed/ItemPatrimonioSeed");

class ItemPatrimonioRepository{
    constructor(){
        // Quando definirmos o ORM, precisaremos adicionar o model aqui.
        // this.model = ItemPatrimonioModel;
        ItemRepoSeed(database); // Popula o nosso banco de dados temporário
        this.database = database;
    }

    async create(dados){
        const newItem = new ItemPatrimonio(
            (patrimonio = dados.patrimonio),
            (descricao = dados.descricao),
            (itemTipo = {
              nome: dados.itemTipo,
              descricao: "-",
              imagem:
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
            }),
            (dataAquisicao = dados.dataAquisicao),
            (precoAquisicao = dados.precoAquisicao),
            (departamento = dados.departamento),
            (responsavel = {
              prontuario: "BP0910292",
              nome: dados.responsavel,
              telefone: "xxx-xxx-xxxx",
              email: "__@ifsp.edu.br",
            })
          )
        database.addItem(newItem);
        return newItem;
    }

    async find(itemPatrimonio){
        return database.findByPatrimonio(itemPatrimonio);
    }

    async all(){
        return database.getAllItems();
    }

    async remove(patrimonioId){
        return database.removeByPatrimonio(patrimonioId);
    }
}

module.exports = new ItemPatrimonioRepository();

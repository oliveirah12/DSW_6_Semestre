const ItemPatrimonio = require("./model/ItemPatrimonio");

// Classe que serve de banco de dados temporário. Será substituído pelo ORM.
class TempDatabase {
    constructor() {
        this.items = []
    }

    getAllItems() {
        return this.items;
    }

    addItem(novoItem) {
        if(novoItem instanceof ItemPatrimonio){
            this.items.push(novoItem)
        }else{
            throw Error("DB: Objeto não é do tipo ItemPatrimonio")
        }
    }

    findByPatrimonio(patrimonio) {
          return this.items.filter(item => item.patrimonio === patrimonio)[0];
    }

    removeByPatrimonio(patrimonio) {
        let item = this.items.splice(this.items.findIndex(item => item.patrimonio === patrimonio), 1);
        return item;
    }
}

let banco = new TempDatabase();

module.exports = banco;
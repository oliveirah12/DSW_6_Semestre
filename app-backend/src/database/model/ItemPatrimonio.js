class ItemPatrimonio {
    constructor(patrimonio, descricao, itemTipo, dataAquisicao, precoAquisicao, departamento, responsavel) {
        this.patrimonio = patrimonio ;
        this.descricao = descricao;
        this.itemTipo = typeof(itemTipo) === "object" ? itemTipo : {
            nome: itemTipo,           
            descricao: "None",        
            imagem: 'https://images.unsplash.com/photo-1602506860730-b690f1a6f662?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        };
        this.dataAquisicao = typeof dataAquisicao == Date ? 
                                     dataAquisicao : new Date(dataAquisicao)
        this.precoAquisicao = precoAquisicao;
        this.departamento = departamento
        this.responsavel = typeof(responsavel) === "object" ? responsavel : {
          prontuario: "BP0910292",
          nome: responsavel,  
          telefone: "408-867-5309",
          email: "gustavo_veras@ifsp.edu.br"
        }
    }
}

module.exports = ItemPatrimonio;
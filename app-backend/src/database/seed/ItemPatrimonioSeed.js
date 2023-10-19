const ItemPatrimonio = require("../model/ItemPatrimonio");

module.exports = (database) => {
  database.addItem(
    new ItemPatrimonio(
      (patrimonio = "IFSP-BR-001"),
      (descricao = "Armário de arquivos"),
      (itemTipo = {
        nome: "Escritorio",
        descricao: "Materiais utilizados em escritório",
        imagem:
          "https://images.unsplash.com/photo-1524820801657-fd59673fbb05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1144&q=80",
      }),
      (dataAquisicao = "2016-08-29T09=12=33.001Z"),
      (precoAquisicao = 999.99),
      (departamento = "Informática"),
      (responsavel = {
        prontuario: "BP0910292",
        nome: "Luiz Gustavo Véras",
        telefone: "408-867-5309",
        email: "gustavo_veras@ifsp.edu.br",
      })
    )
  );

  database.addItem(
    new ItemPatrimonio(
      (patrimonio = "IFSP-BR-002"),
      (descricao = "Carteira"),
      (itemTipo = {
        nome: "Sala de aula",
        descricao: "Materiais de sala de aula",
        imagem:
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      }),
      (dataAquisicao = "2016-08-29T09=12=33.001Z"),
      (precoAquisicao = 999.99),
      (departamento = "CAE"),
      (responsavel = {
        prontuario: "BP0910292",
        nome: "Luiz Gustavo Véras",
        telefone: "408-867-5309",
        email: "gustavo_veras@ifsp.edu.br",
      })
    )
  );

  database.addItem(
    new ItemPatrimonio(
      (patrimonio = "IFSP-BR-003"),
      (descricao = "Bebedouro"),
      (itemTipo = {
        nome: "Infraestrutura",
        descricao: "Materiais utilizados em corredores e de infraestrutura",
        imagem:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      }),
      (dataAquisicao = "2016-08-29T09=12=33.001Z"),
      (precoAquisicao = 999.99),
      (departamento = "Almoxarifado"),
      (responsavel = {
        prontuario: "BP0910292",
        nome: "Luiz Gustavo Véras",
        telefone: "408-867-5309",
        email: "gustavo_veras@ifsp.edu.br",
      })
    )
  );

  database.addItem(
    new ItemPatrimonio(
      (patrimonio = "IFSP-BR-004"),
      (descricao = "Bebedouro"),
      (itemTipo = {
        nome: "Infraestrutura",
        descricao: "Materiais utilizados em corredores e de infraestrutura",
        imagem:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      }),
      (dataAquisicao = "2016-08-29T09=12=33.001Z"),
      (precoAquisicao = 999.99),
      (departamento = "Almoxarifado"),
      (responsavel = {
        prontuario: "BP0910292",
        nome: "Luiz Gustavo Véras",
        telefone: "408-867-5309",
        email: "gustavo_veras@ifsp.edu.br",
      })
    )
  );
};

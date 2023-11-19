<template>
  <div class="page-container">
    <button class="button" @click= "listarControles">Listar Controles</button>
    <br>
    <div>{{ mensagemPadrao }}</div>
    <div v-if="listaControles.length !== 0" class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Estufa</th>
              <th>Bomba</th>
              <th>Válvula</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="controle in listaControles" :key="controle.id">
              <td>{{ controle.id }}</td>
              <td>{{ controle.comando_bomba ? "Ativa" : "Inativa"}}</td>
              <td>{{ controle.comando_valvula ? "Ativa" : "Inativa"}}</td>
              <td><button class="button" @click=ligaDesliga(controle.id)>{{controle.comando_bomba && controle.comando_valvula ? "Ativo" : "Inativo" }}</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </template>
    
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const mensagemPadrao = ""

  const ligaDesliga = (id) =>{
    const bomba = listaControles.value[id-1].comando_bomba
    const valvula = listaControles.value[id-1].comando_valvula

    if(bomba && valvula){
      desligar(id)
    }else{
      ligar(id)
    }
    listarControles();
  } 
  
  const ligar = async (id) => {
      try {
          const response = await axios.put(`http://localhost:4000/ligar/controles/${id}`);
      } catch (error) {
          console.error('Erro ao ligar:', error);
      }
  };
  
  const desligar = async (id) => {
      try {
          const response = await axios.put(`http://localhost:4000/desligar/controles/${id}`);
      } catch (error) {
          console.error('Erro ao desligar:', error);
      }
  };

  const listaControles = ref([]);

  const listarControles = async () => {
    const apiUrl = 'http://localhost:4000/controlesIrrigacao';

    try {
      // Faz a requisição GET para a API usando o Fetch API
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }

        // Converte a resposta para JSON
        listaControles.value = await response.json();
        if(listaControles.length <= 0){
          mensagemPadrao = "Sem controles para visualização"
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    
   const formatarHora = (data) => {
      const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
      return new Date(data).toLocaleTimeString('pt-BR', options);
    }

  
  </script>
    
  <style lang="scss" scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  
  .button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 150px;
  }
  
  .button:hover {
    background-color: #75aae2;
  }
  
  .manual-buttons {
    display: flex;
    justify-content: center;
  }
  
  .manual-buttons button {
    margin: 5px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100px;
  }
  
  .manual-buttons button:hover {
    background-color: #75aae2;
  }

  .table-container {
  width: 80%;
  margin-top: 20px;
  overflow-y: auto; /* Adiciona a barra de rolagem vertical */
}

.custom-table {
  width: 100%; /* Ajustado para 100% para preencher o contêiner */
  border-collapse: collapse;
}

.custom-table th, .custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.custom-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
  </style>
    
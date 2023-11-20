<template>
  <div class="page-container">
    <button class="button" @click= "listarEstufas">Listar status estufas</button>
    <br>
    <div>{{ mensagemPadrao }}</div>
    <div v-if="listaEstufas.length !== 0" class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th><input type="checkbox"></th>
              <th>ID estufa</th>
              <th>Nome</th>
              <th>Localização</th>
              <th>Capacidade</th>
              <th>Temperatura</th>
              <th>Umidade</th>
              <th>Consumo</th>
              <th>Data Inclusão</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="estufas in listaEstufas" :key="estufas.id">
              <td><input type="checkbox"></td>
              <td>{{ estufas.id}}</td>
              <td>{{ estufas.nome }}</td>
              <td>{{ estufas.localizacao }}</td>
              <td>{{ estufas.capacidade  }}</td>
              <td>{{ estufas.dadosEstufa.temperatura }} Cº</td>
              <td>{{ estufas.dadosEstufa.umidade }}</td>
              <td>{{ estufas.dadosEstufa.consumo_agua }}L/h</td>
              <td>{{ estufas.dadosEstufa.timestamp }}</td>
              <td><button class="button_delete" @click="deletarEstufa(estufas.id)">Deletar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <br>
      <button class="button_include">Incluir Estufa</button>
    </div>
    
  </template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  

    const listaEstufas = ref([])
    const listaSistemas = ref([])

    const listarEstufas = async () => {
      const apiUrlEstufas = 'http://localhost:4000/estufas';

      try {
        // Faz a requisição GET para a API usando o Fetch API
          const response = await fetch(apiUrlEstufas);
          console.log(response)
          if (!response.ok) {
            throw new Error('Erro ao buscar dados linha 60');
          }

          listaEstufas.value = await response.json();

          console.log(listaEstufas)


          if(listaEstufas.length <= 0){
            mensagemPadrao = "Sem estufas para visualização"
          }

        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
    }

    const listarSistemas = async () =>{
      const apiUrlSistemas = 'http://localhost:4000/sistemas';
      try{
        const response = await fetch(apiUrlSistemas);
        console.log(response)
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }

        listaSistemas.value = await response.json();
        console.log(listaSistemas)
        if(listaSistemas.length <= 0){
          mensagemPadrao = "Sem sistemas para visualização"
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    
   const formatarHora = (data) => {
      const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
      return new Date(data).toLocaleTimeString('pt-BR', options);
    }


    const deletarEstufa = async (id) => {
      try {

        const response = await axios.delete(`http://localhost:4000/estufas/${id}`)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
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
    width: 200px;
  }
  .button_delete {
    margin: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 75%;
  }

  .button_include {
    margin: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 10%;
  }
  .button_include:hover {
    background-color: #75aae2;
  }

  .button_delete:hover {
    background-color: #75aae2;
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
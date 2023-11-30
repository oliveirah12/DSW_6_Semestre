<template>
    <Header/>
  <div class="table-pesquisa">
      <table class="custom-table-pesquisa">
        <thead>
          <tr>
            <th>Data Incial</th>
            <th>Data Final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-pesquisa-datas"><input v-model="dataInicio" class="datas" type="date" id="dataInicio"></td>
            <td class="table-pesquisa-datas"><input v-model="dataFinal" class="datas" type="date" id="dataFinal"></td>
            <td><button class="button" @click="listarRelatorios">Listar Relatórios</button></td>
          </tr>
        </tbody>
      </table>
  </div>
  
  <div class="page-container">
    <br>
    <div v-if="listaRelatorios.length !== 0" class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th>ID Estufa</th>
            <th>Nome Estufa</th>
            <th>Localização</th>
            <th>Capacidade</th>
            <th>Umidade (%)</th>
            <th>Temperatura (°C)</th>
            <th>Data</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="relatorio in listaRelatorios" :key="relatorio.id">
            <td>{{ relatorio.estufa.id }}</td>
            <td>{{ relatorio.estufa.nome }}</td>
            <td>{{ relatorio.estufa.localizacao }}</td>
            <td>{{ relatorio.estufa.capacidade }}</td>
            <td>{{ relatorio.umidade }}%</td>
            <td>{{ relatorio.temperatura }}°C</td>
            <td>{{ formatDate(relatorio.data) }}</td>
            <td>{{ relatorio.hora  }}</td>
            <td><button class="button-delete" @click="excluirRelatorio(relatorio.id)"> Excluir</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    const listaRelatorios = ref([])
    const dataInicio = ref(null);
    const dataFinal = ref(null);

    

    const listarRelatorios = async () => {
      let apiUrlRelatorios = `http://localhost:4000/relatorios?dataInicio=${dataInicio.value}&dataFim=${dataFinal.value}`;
      
      if (!dataInicio.value && !dataFinal.value) {
        apiUrlRelatorios = `http://localhost:4000/relatorio`;
      }else if(!dataInicio.value || !dataFinal.value){
        window.alert("Selecione as duas datas")
        return
      }

      
      
      try {
        // Faz a requisição GET para a API usando o Fetch API
          const response = await fetch(apiUrlRelatorios);
          console.log(response)

          if (!response.ok) {
            throw new Error('Erro ao buscar dados');
          }

          listaRelatorios.value = await response.json();
          console.log(listaRelatorios.data)

        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
    }
    
    const excluirRelatorio = async (id) => {
      try {

        const response = await axios.delete(`http://localhost:4000/deleterelatorio/${id}`)
        listarRelatorios()
        console.log(response)
        window.alert("Relatório Excluído")
      } catch (error) {
        window.alert("Erro ao excluir relatório")
        console.log(error)
      }
    }

    const formatDate = (input) => {
      var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1], day = datePart[2];

      return day+'/'+month+'/'+year;
}


</script>

<style lang="scss" scoped>
  
.table-pesquisa {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5%;
  padding-top: 5%;
}

.datas{
    border: 2px solid black;
    padding: 10px;
    border-radius: 5px;
}

.table-pesquisa-datas {
  padding-right: 100%;
}

.page-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  flex-direction: column;
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

.custom-table-pesquisa {
  width: 60%; /* Ajustado para 100% para preencher o contêiner */
  border-collapse: collapse;
}

.custom-table-pesquisa th, .custom-table-pesquisa td {
  text-align: start;
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

.button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 170px;
  }
  
  .button:hover {
    background-color: #75aae2;
  }
  
  .button-delete {
    margin: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100px;
  }

  .button-delete:hover {
    background-color: #75aae2;
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
</style>

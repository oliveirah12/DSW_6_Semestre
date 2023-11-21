<template>
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
            <td class="table-pesquisa-datas"><input v-model="dataInicio" class="table-pesquisa-datas" type="date" id="dataInicio"></td>
            <td class="table-pesquisa-datas"><input v-model="dataFinal" type="date" id="dataFinal"></td>
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
            <th>Data</th>
            <th>Hora</th>
            <th>Umidade (%)</th>
            <th>Temperatura (°C)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="relatorio in listaRelatorios" :key="relatorio.id">
            <td>{{ relatorio.data }}</td>
            <td>{{ relatorio.hora  }}</td>
            <td>{{ relatorio.umidade }}%</td>
            <td>{{ relatorio.temperatura }}°C</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    const listaRelatorios = ref([])
    const dataInicio = ref(null);
    const dataFinal = ref(null);

    

    const listarRelatorios = async () => {
      
      console.log(dataInicio.value)
      if (!dataInicio.value || !dataFinal.value) {
        window.alert("Selecione um período de datas")
        return
      }

      const apiUrlRelatorios = `http://localhost:4000/relatorios?dataInicio=${dataInicio.value}&dataFim=${dataFinal.value}`;
      
      try {
        // Faz a requisição GET para a API usando o Fetch API
          const response = await fetch(apiUrlRelatorios);
          console.log(response)
          if (!response.ok) {
            throw new Error('Erro ao buscar dados');
          }

          listaRelatorios.value = await response.json();
          console.log(listaRelatorios)



        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
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
</style>

<template>
  <div class="page-container">
    <button class="button" @click="listarRelatorios">Listar Relatórios</button>
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
            <td>{{ formatarData(relatorio.timestamp) }}</td>
            <td>{{ formatarHora(relatorio.timestamp) }}</td>
            <td>{{ relatorio.umidade }}%</td>
            <td>{{ relatorio.temperatura }}°C</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  async setup() {
    const response = await axios.get('http://localhost:4000/relatorio');
    const listaRelatorios = response.data;
    return { listaRelatorios };
  },
  methods: {
    listarRelatorios() {
      axios.get(`http://localhost:4000/relatorio`)
        .then(response => {
          this.listaRelatorios = response.data;
        })
        .catch(error => {
          console.error('Erro ao listar relatórios:', error);
        });
    },
    formatarData(data) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(data).toLocaleDateString('pt-BR', options);
    },
    formatarHora(data) {
      const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
      return new Date(data).toLocaleTimeString('pt-BR', options);
    }
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

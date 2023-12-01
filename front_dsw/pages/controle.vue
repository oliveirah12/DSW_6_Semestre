<template>
  <Header />
  <div class="page-container">
    <div>
      <button class="button" @click="listarControles">Listar Controles</button>
      <button style="width: 125px;" :style="{ backgroundColor: attAuto ? 'Green' : 'Red' }" class="button"
        @click="ligaDesligaAuto">Tempo Real</button>
    </div>
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
            <td>{{ controle.estufa_id }}</td>
            <td :class="{ 'ativo': controle.comando_bomba, 'inativo': !controle.comando_bomba }">{{ controle.comando_bomba
              ? "Ativa" : "Inativa" }}</td>
            <td :class="{ 'ativo': controle.comando_valvula, 'inativo': !controle.comando_valvula }">{{
              controle.comando_valvula ? "Ativa" : "Inativa" }}</td>
            <td><button class="button" @click=ligaDesliga(controle.id)
                :style="{ backgroundColor: controle.comando_bomba && controle.comando_valvula ? 'Green' : 'Red' }">{{ controle.comando_bomba
                  && controle.comando_valvula ? "Ativo" : "Inativo" }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
    
<script setup>
import { ref } from 'vue';
import { api } from '../infra/axios-config'


const apiUrlControles = `http://localhost:4000`;
const mensagemPadrao = ""

const ligaDesliga = (id) => {
  const controleEncontrado = listaControles.value.find(item => item.id === id);
  const bomba = controleEncontrado.comando_bomba;
  const valvula = controleEncontrado.comando_valvula;
  if (bomba && valvula) {
    desligar(id)
  } else {
    ligar(id)
  }
  listarControles();
}

const ligar = async (id) => {
  try {
    const response = await api.put(`${apiUrlControles}/ligar/controles/${id}`);
  } catch (error) {
    console.error('Erro ao ligar:', error);
    if(error.response.status === 401){
      window.alert('Usuário não autenticado')
    }
  }
  listarControles();
};

const desligar = async (id) => {
  try {
    const response = await api.put(`${apiUrlControles}/desligar/controles/${id}`);
  } catch (error) {
    console.error('Erro ao desligar:', error);
    if(error.response.status === 401){
      window.alert('Usuário não autenticado')
    }
  }
  listarControles();
};

const listaControles = ref([]);

const listarControles = async () => {

  try {

    const response = await api.get(`${apiUrlControles}/controlesIrrigacao`);


    listaControles.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    if(error.response.status === 401){
      window.alert('Usuário não autenticado')
    }
  }
};


let attAuto = ref()
attAuto.value = false
let myInterval

const ligaDesligaAuto = () => {
  if(!localStorage.getItem('token')){
    window.alert('Usuário não autenticado')
    return
  }
  attAuto.value = !attAuto.value
  if (attAuto.value == true) {
    atualizarAuto()
    myInterval = setInterval(atualizarAuto, 10000);
  } else {
    clearInterval(myInterval)
    console.log('Att Auto Desligada')
  }

}

const atualizarAuto = () => {
  if (attAuto.value == true) {
    listarControles()
    console.log("Atualizado")
  } else {
    console.log(attAuto.value + ' - ELSE')
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
  overflow-y: auto;
  /* Adiciona a barra de rolagem vertical */
}

.custom-table {
  width: 100%;
  /* Ajustado para 100% para preencher o contêiner */
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.custom-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.ativo {
  background-color: green;
  color: white;
}

.inativo {
  background-color: red;
  color: white;
}</style>
    
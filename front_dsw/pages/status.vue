<template>
    <Header/>
  <div class="page-container">
    <div>
      <button class="button" @click= "listarEstufas">Listar Estufas</button>
      <button style="width: 125px;" :style="{ backgroundColor: attAuto ? 'Green' : 'Red'}" class="button" @click="ligaDesligaAuto">Tempo Real</button>
    </div>
    <br>
    <div class="botoesIncluiExclui">
        <button class="button_include" @click="mostrarFormulario" :style="{ backgroundColor: botaoIncluirDesabilitado ? 'gray' : '#007BFF', cursor:botaoIncluirDesabilitado ? 'not-allowed' : 'pointer'}" :disabled="botaoIncluirDesabilitado">Incluir Estufa</button>
        <button class="button_include" v-if="exibirFormulario" @click="fecharFormulario">Cancelar</button>
      </div>

      <form class="form-incluirEstufa" v-if="exibirFormulario" @submit.prevent="adicionarEstufa">
        <label for="nome">Nome: </label>
        <input class="inputsForm" type="text" v-model="novaEstufa.nome" required />

        <label for="localizacao">Localização: </label>
        <input class="inputsForm" type="text" v-model="novaEstufa.localizacao" required />

        <label for="capacidade">Capacidade: </label>
        <input class="inputsForm" style="width: 75px;" type="number" @input=verificaCapacidade id="capacidadeEstufa" v-model="novaEstufa.capacidade" required />

        <button class="button" type="submit" :style="{ backgroundColor: capacidadeInvalida ? 'gray' : '#007BFF', cursor:capacidadeInvalida ? 'not-allowed' : 'pointer'}" :disabled="capacidadeInvalida">Adicionar Estufa</button>


      </form>
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
              <td>{{ estufas.dadosEstufa.umidade }}%</td>
              <td>{{ estufas.dadosEstufa.consumo_agua }}L/h</td>
              <td>{{ estufas.dadosEstufa.timestamp }}</td>
              <td><button class="button_delete" @click="deletarEstufa(estufas.id)">Deletar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <br>
        
     
      


    </div>
    
  </template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
    const listaEstufas = ref([])
    const token = localStorage.getItem('token')

    const listarEstufas = async () => {
      const apiUrlEstufas = `http://localhost:4000/estufas/${token}`;

      try {
        // Faz a requisição GET para a API usando o Fetch API
          const response = await fetch(apiUrlEstufas);
          if (!response.ok) {
            throw new Error('Erro ao buscar dados linha 60');
          }

          listaEstufas.value = await response.json();


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

        const response = await axios.delete(`http://localhost:4000/deleteestufa/${id}`)
        listarEstufas()
        console.log(response)
        window.alert("Estufa Excluída")
      } catch (error) {
        window.alert("Erro ao excluir estufa")
        console.log(error)
      }
    }

    const exibirFormulario = ref(false);
    const novaEstufa = ref({
      nome: '',
      localizacao: '',
      capacidade: 0,
    });

    const capacidadeInvalida = ref(true);
    const verificaCapacidade = () => {
      if (document.getElementById('capacidadeEstufa').value <= '0') {
        capacidadeInvalida.value = true;
      }else{
        capacidadeInvalida.value = false;
      }

    }

  
  const adicionarEstufa = async () => {

    botaoIncluirDesabilitado.value = true;
    

    try {
      // Lógica para adicionar estufa à lista
      const response = await axios.post(`http://localhost:4000/addestufa`, novaEstufa.value);

      // Verifique a resposta da API conforme necessário
      if (response.status === 200) {
        // Adiciona a estufa à lista local
        listaEstufas.value.push({
          id: response.data.id,
          ...novaEstufa.value,
          dadosEstufa: {
            temperatura: 0,
            umidade: 0,
            consumo_agua: 0,
            timestamp: new Date().toLocaleString(),
          },
        });



        exibirFormulario.value = false;
        capacidadeInvalida.value = false;
      }
      window.alert("Estufa adicionada")
      listarEstufas()
      } catch (error) {
        console.error('Erro na requisição:', error);
        window.alert("Erro ao adicionar estufa")

      } finally {
        // Reabilita o botão após a adição ou erro
        botaoIncluirDesabilitado.value = false;
        exibirFormulario.value = false;
        novaEstufa.value = {
          nome: '',
          localizacao: '',
          capacidade: 0,
          // Limpe mais campos conforme necessário
      };
    }
  };

    let attAuto = ref()
    attAuto.value = false
    let myInterval

    const ligaDesligaAuto = () =>{
      attAuto.value = !attAuto.value
      if(attAuto.value == true){
        atualizarAuto()
        myInterval = setInterval(atualizarAuto, 10000);
      }else{
        clearInterval(myInterval)
        console.log('Att Auto Desligada')
      }
      
    }

    const atualizarAuto = () => {
      if(attAuto.value == true){
        listarEstufas()
        console.log("Atualizado")
      }else{
        console.log(attAuto.value + ' - ELSE')
      }
    }


    let botaoIncluirDesabilitado = ref(false);
    const mostrarFormulario = () => {
      exibirFormulario.value = true;
      botaoIncluirDesabilitado = ref(true);
    };

    const fecharFormulario = () => {
      exibirFormulario.value = false;
      botaoIncluirDesabilitado = ref(false); 
      listarEstufas()
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

  .botoesIncluiExclui {
    width: 100%; 
    align-items: center; 
    justify-content: center; 
    display: flex;
  }

  .form-incluirEstufa{
    border: 2px solid black;
    padding: 10px;
    border-radius: 5px;
  }

  .inputsForm{
    margin-right: 10px;
    border-bottom: 2px solid black;
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
    width: 170px;
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
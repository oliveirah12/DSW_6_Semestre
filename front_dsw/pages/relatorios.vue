<template>
  <div class="page-container">
    <!-- Seu conteúdo de componente aqui -->
    <button @click="listarRelatorios">Listar Relatórios</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    listarRelatorios() {
      axios.get('/relatorio')
        .then(response => {
          // Manipule a resposta dos relatórios aqui
          console.log(response.data);
        })
        .catch(error => {
          console.error('Erro ao listar relatórios:', error);
        });
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
</style>
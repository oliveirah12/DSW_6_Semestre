<template>
    <header v-if="showHeader">
      <div class="left-buttons">
        <button @click="redirectToStatus">Status</button>
        <button @click="redirectToControle">Controle</button>
        <button @click="redirectToRelatorios">Relatórios</button>
      </div>
      <div class="right-buttons">
        <button @click="signOut">Deslogar</button>
      </div>
    </header>
  </template>
  
  <script>
  
  export default {
    data(){
      return{
        showHeader:true
      }
    },
    name: 'Header',
    methods: {
      redirectToStatus() {
        
        this.$router.push('/status'); 
      },
      redirectToControle() {
        
        this.$router.push('/controle'); 
      },
      redirectToRelatorios() {
        
        this.$router.push('/relatorios'); 
      },
      signOut() {
        if(localStorage.getItem('token')){
          window.alert('Usuário deslogado com sucesso')
        }
          localStorage.setItem('token', '')
          this.$router.push('/')  
      },
    },
  }
  </script>
  
  <style scoped>
  /* Estilos do cabeçalho */
  header {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  
  .left-buttons {
    display: flex;
  }
  
  .left-buttons button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px;
  }
  
  .left-buttons button:hover {
    text-decoration: underline;
  }
  
  .right-buttons button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px;
  }
  
  .right-buttons button:hover {
    text-decoration: underline;
  }
  </style>
  
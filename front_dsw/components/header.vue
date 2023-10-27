<template>
    <header>
      <div class="left-buttons">
        <button @click="redirectToStatus">Status</button>
        <button @click="redirectToControle">Controle</button>
        <button @click="redirectToRelatorios">Relatórios</button>
      </div>
      <div class="right-buttons">
        <button @click="signOut">Sign Out</button>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
    methods: {
      redirectToStatus() {
        
        this.$router.push('/status'); 
      },
      redirectToControle() {
        
        this.$router.push('/'); 
      },
      redirectToRelatorios() {
        
        this.$router.push('/relatorios'); 
      },
      signOut() {
        // Implemente aqui a lógica para sair do sistema (por exemplo, deslogar o usuário)
        // Isso pode envolver redirecionar para a página de login ou limpar as informações de autenticação.
        // Exemplo: this.$router.push('/login');
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
  
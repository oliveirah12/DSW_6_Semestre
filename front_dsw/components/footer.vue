<template>
    <footer>
      <p>&copy; {{ currentYear }} IFSP - BRA</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos do rodapé */
  footer {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    text-align: center;
  }
  </style>
  
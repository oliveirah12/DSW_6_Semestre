<template>
    <div class="page-container">
      <div class="button-container">
        <button class="button" @click="toggleManual('automatic')">Automático</button>
        <button class="button" @click="toggleManual('manual')">Manual</button>
        <div v-if="showManualButtons" class="manual-buttons">
          <button @click="ligar">Ligar</button>
          <button @click="desligar">Desligar</button>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref } from 'vue';
  
  
  const showManualButtons = ref(false);
  
  const toggleManual = (mode) => {
    if (mode === 'manual') {
      showManualButtons.value = !showManualButtons.value;
    } else {
      showManualButtons.value = false;
    }
  };
  
  const ligar = () => {
    // Implemente a lógica para ligar
    console.log('Ligado');
  };
  
  const desligar = () => {
    // Implemente a lógica para desligar
    console.log('Desligado');
  };
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
  </style>
    
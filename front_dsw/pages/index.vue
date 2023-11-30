<template>
  <div class="page-container">
    <div class="login-container">
      <h2 class="label">Login</h2>
      <hr>
      <br>
      <form class="form" @submit.prevent="login">
        <label class="label" for="username">Usuário:</label>
        <input class="input" type="text" id="username" v-model="username" required>

        <label class="label" for="password">Senha:</label>
        <input class="input" type="password" id="password" v-model="password" required>

        <button class="button" type="submit">Entrar</button>
        <label style="align-self: center;">ou</label>
        <button class="button">Cadastre-se</button>
      </form>
    </div>
  </div>
</template>

<script setup>

  import axios from 'axios';
  
  
  const data = reactive({
    username: '',
    password: ''
  });

  const login = async () => {
    console.log('Username:', data.username);
    console.log('Password:', data.password);

    const auth = 'http://localhost:5000/auth/login';


    // Resetar campos após o login (opcional)
    data.username = '';
    data.password = '';
  };


</script>

<style lang="scss" scoped>

.page-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.login-container {
  width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5%;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.label {
  margin-bottom: 8px;
  margin-left: 5%;
}

.input {
  padding: 8px;
  margin-bottom: 16px;
  border: 2px solid black;
  border-radius: 5px;
  width: 90%;
  align-self: center;
}

.button {
    margin: 10px;
    padding: 5px 5px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 90%;
    align-self:center ;
  }
  
  .button:hover {
    background-color: #75aae2;
  }
</style>
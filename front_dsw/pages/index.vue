<template>
  <div class="page-container">
    <div class="login-container">
      <h2 class="titulo">Login</h2>
      <hr>
      <br>

      <form class="form" @submit.prevent="loginEstufa">
        <label class="label" for="user">Usuário:</label>
        <input class="input" type="text" id="loginUser" v-model="data.loginUser" required>

        <label class="label" for="pass">Senha:</label>
        <input class="input" type="password" id="senha" v-model="data.senha" required>

        <button class="button" type="submit">Entrar</button>
        <label style="align-self: center;">ou</label>
      </form>

      <button class="button" @click="irParaCadastro">Cadastre-se</button>
    </div>
  </div>
</template>

<script setup>

import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();


const data = reactive({
  loginUser: '',
  senha: ''
});

const loginEstufa = async () => {
  try {

    const response = await axios.post('http://localhost:5000/auth/login', {
      login: data.loginUser,
      senha: data.senha
    });

    console.log(response)

    if (response.status === 201) {
      console.log('Login bem-sucedido');

      const token = response.data.token;

      window.alert("Login Bem sucedido")

      localStorage.setItem('token', token);

      irParaStatus();
    } else {
      console.error('Falha no login');
      // Tratar falha no login, exibir mensagem de erro, etc.
    }
  } catch (error) {

    if (error.response.status === 404) {
      window.alert("Login não existe")
    }

    if (error.response.status === 422) {
      window.alert("Senha incorreta")
    }
    
  }
};

const irParaStatus = () => {
  router.push('status');
}

const irParaCadastro = () => {
  router.push('cadastro');
};


</script>

<style lang="scss" scoped>
.titulo {
  font-size: x-large;
  align-self: center;
  font-weight: 700;
}

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
  display: flex;
  flex-direction: column;
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
  align-self: center;
}

.button:hover {
  background-color: #75aae2;
}
</style>
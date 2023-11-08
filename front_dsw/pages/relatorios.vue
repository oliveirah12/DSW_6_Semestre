<template>
  <div class="page-container">
    <!-- Seu conteúdo de componente aqui -->
    <button @click="listarRelatorios">Listar Relatórios</button>
    <div v-if="listaRelatorios.length != 0">
      <p v-for="relatorio in listaRelatorios">
        Umidade: {{ relatorio.umidade }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
    // Não vale mais, pois é do antigo Nuxt 2
  // async asyncData({$http }) {
  //     const response = await axios.get(`http://localhost:4000/relatorio`)
  //     // const post = await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
  //     const listaRelatorios = response.data;
  //     console.log(response.data)
  //     return { listaRelatorios }
  // },
  // Executado quando a página carrega
  async setup() {
    // const { data, error } = useFetch(
    //   "https://jsonplaceholder.typicode.com/posts"
    // );
    const response = await axios.get(`http://localhost:4000/relatorio`)
    const listaRelatorios = response.data;
    console.log(response.data)
    return { listaRelatorios };
  },
  data: function(){
    return {listaRelatorios: []}
  },
  // Não vale mais, pois é do antigo Nuxt 2
  // async fetch() {
  //     const response = await axios.get(`http://localhost:4000/relatorio`)
  //     this.listaRelatorios = response.data;
  //     console.log(response.data)
  // },
  methods: {
    listarRelatorios() {
      axios.get('http://localhost:4000/relatorio')
        .then(response => {
          // Manipule a resposta dos relatórios aqui
          console.log(response.data);
          this.listaRelatorios2 = response.data;
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
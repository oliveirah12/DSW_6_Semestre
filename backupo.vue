<template>
    <div>
      <!-- Navegação -->
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">IFalmoxarifado</b-navbar-brand>
  
        <b-nav-form>
          <b-form-input size="sm" v-model="itemSearch" class="sr-sm-3" placeholder="Busca por descrição"></b-form-input>
        </b-nav-form>
  
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav right>
            <b-nav-item @click="openCardView()">
              Card View
            </b-nav-item>
            <b-nav-item @click="openTabView()">
              Table View
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
  
        <b-button v-b-modal.modal-novo-item variant="dark">Novo Item</b-button>
      </b-navbar>
  
      <!-- Modal para inserir novo -->
      <b-modal id="modal-novo-item" title="Novo item de inventário" hide-footer>
        <b-overlay :show="show" rounded="sm">
          <b-form v-on:submit="createNewItem">
            <label class="mr-sm-2" for="input-patrimonio">Patrimônio:</label>
            <b-form-input id="input-patrimonio" v-model="novoItem.patrimonio" class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Ex: IFSP-BRA-001"></b-form-input>
  
            <label class="mr-sm-2" for="input-descricao">Descrição:</label>
            <b-form-input id="input-descricao" v-model="novoItem.descricao" class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Descrição do item"></b-form-input>
  
            <label class="mr-sm-2" for="item-type">Tipo de item:</label>
            <b-form-select id="item-type" v-bind:options="listaTiposItens" v-bind:value="null" v-model="novoItem.itemTipo">
            </b-form-select>
  
            <label class="mr-sm-2" for="input-data">Data de aquisição:</label>
            <b-form-datepicker id="input-data" v-model="novoItem.dataAquisicao" class="mb-2">
            </b-form-datepicker>
  
            <label class="mr-sm-2" for="input-preco">Preço de aquisição</label>
            <b-form-input id="input-preco" v-model="novoItem.precoAquisicao" class="mb-2 mr-sm-2 mb-sm-0"
              placeholde="0.00"></b-form-input>
  
            <label class="mr-sm-2" for="input-departamento">Departamento</label>
            <b-form-select id="input-departamento" v-bind:options="departamentos" v-model="novoItem.departamento"
              v-bind:value="null">
            </b-form-select>
  
            <label class="mr-sm-2" for="input-responsavel">Responsável</label>
            <b-form-input v-model="novoItem.responsavel" id="input-responsavel" class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Nome do Servidor"></b-form-input>
  
            <b-button type="submit" variant="primary" @click="show = !show">Criar</b-button>
            <b-button type="reset" variant="danger">Limpar</b-button>
          </b-form>
        </b-overlay>
      </b-modal>
  
      <!-- Tabela do iventário -->
      <div class="invent-table" v-if="tableView">
        <b-table id="items-table" striped hover :per-page="perPage" :current-page="currentPage"
          v-bind:items="items | $options.filters.filterSearch(itemSearch)">
          <template #cell(itemTipo)="cellData">
            {{ cellData.item.itemTipo.nome }}
          </template>
          <template #cell(dataAquisicao)="cellData">
            {{ (new Date(Date.parse(cellData.item.dataAquisicao))).toLocaleString() }}
          </template>
          <template #cell(responsavel)="cellData">
            {{ cellData.item.responsavel.nome }}
          </template>
        </b-table>
        <b-pagination align="center" v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
          aria-controls="items-table">
        </b-pagination>
      </div>
  
      <!-- Cards do iventário -->
      <div class="invent-cards" v-if="cardView">
        <b-card-group deck>
          <!-- Dentro do v-for, o filtro deve ser invocado como um método -->
          <card-item v-bind:key="item.patrimonio" 
                     v-for="item in filterSearch(items, itemSearch)"
                     v-bind:item="item"></card-item>
        </b-card-group>
      </div>
    </div>
  </template>
  
  <script setup lang="js">
  // import {} from 'vue';
  // import CardItem from '../components/CardItem.vue'
  //Executado quando a instância do Vue estiver construída
  // async asyncData({ $axios }) {
  //   let items, totalRows;
  //   try {
  //     const response = await $axios.$get('patrimonio');
  //     items = response;
  //     totalRows = items.length;
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  //   return { items, totalRows }
  // }, 
  // ===== DATA ======
  const show = ref(false);
  const tableView = ref(true);
  const cardView = ref(false);
  const itemSearch = ref("");
  const currentPage = ref(1);
  const totalRows = ref(0);
  const perPage = ref(3);
  const url = ref('');
  const items = reactive([]);
  const listaTiposItens = reactive([
    { text: "Escolha um:", value: null },
    "Escritório",
    "Sala de Aula",
    "Infraestrutura"
  ]);
  const departamentos = reactive([
    { text: "Escolha um:", value: null },
    "CAE",
    "Informática",
    "Almoxarifado"
  ]);
  const novoItem = reactive({
    patrimonio: "",
    descricao: "",
    itemTipo: "",
    dataAquisicao: null,
    precoAquisicao: 0.00,
    departamento: "",
    responsavel: ""
  });
  
  // ===== METHODS ======
  const createNewItem = function (event) {
    event.preventDefault();
    console.log(JSON.stringify(this.novoItem));
    // A instância do axios disponível no Nuxt.js é acessível
    // por this.$axios.
    // Veja mais sobre em https://axios.nuxtjs.org/usage
    this.$axios
      .$post("patrimonio", this.novoItem)
      .then((response) => {
        console.log('Resposta do servidor obtida');
        // Acessa o objeto que controla os modais e esconde aquele que você passar o id.
        this.$bvModal.hide('modal-novo-item');
        this.show = false;
        this.updateItemList();
      })
      .catch((error) => {
        console.error('Não foi possível criar um novo item');
        console.log(error);
        this.$bvModal.hide('modal-novo-item');
        this.show = false;
      });
  };
  
  const openCardView = function () {
    cardView = true;
    tableView = false;
  };
  
  const openTabView = function () {
    cardView = false;
    tableView = true;
  }
  
  const updateItemList = function () {
    // A instância do axios disponível no Nuxt.js é acessível
    // por this.$axios.
    // Veja mais sobre em https://axios.nuxtjs.org/usage
    this.$axios.$get("patrimonio").then((response) => {
      this.items = response;
      this.totalRows = this.items.length
    })
  },
  
  const removeSelectedItem = function (item) {
    // A instância do axios disponível no Nuxt.js é acessível
    // por this.$axios.
    // Veja mais sobre em https://axios.nuxtjs.org/usage
    this.$axios.$delete(`patrimonio/${patrimonioId}`).then((response) => {
      let msg = response.data
      alert(msg);
      this.updateItemList();
    });
  
  
    const filterSearch = function (items, itemSearch) {
      if (itemSearch.length > 0) {
        return items.filter((item) =>
          item.itemTipo.descricao.toLowerCase().includes(itemSearch.toLowerCase())
        )
      } else {
        return items
      }
    };
  </script>
  
  <style scoped>
  .invent-table {
    padding: 0 100px;
    margin: 0 auto;
  }
  
  .invent-cards {
    padding: 0px 100px;
    margin: 20px auto;
  }
  </style>
  
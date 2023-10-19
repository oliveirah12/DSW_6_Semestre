<template>
  <div>
    <!-- Navegação -->
    <v-app-bar color="primary">
      <v-app-bar-title>IFalmoxarifado</v-app-bar-title>

      <v-btn @click="openCardView()">
        Card View
      </v-btn>

      <v-btn @click="openTabView()">
        Table View
      </v-btn>

      <!-- Modal para inserir novo -->
      <v-dialog id="modal-novo-item" variant="tonal">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" text="Novo Item"> </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="CRIAR NOVO">
            <v-container>
              <v-form v-on:submit.prevent="createNewItem">
                <label class="mr-sm-2" for="input-patrimonio">Patrimônio:</label>
                <v-text-field id="input-patrimonio" v-model="novoItem.patrimonio" class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Ex: IFSP-BRA-001"></v-text-field>

                <label class="mr-sm-2" for="input-descricao">Descrição:</label>
                <v-text-field id="input-descricao" v-model="novoItem.descricao" class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Descrição do item"></v-text-field>

                <label class="mr-sm-2" for="item-type">Tipo de item:</label>
                <v-combobox id="item-type" label="Selecione o tipo de item" v-bind:items="listaTiposItens"
                  v-bind:value="null" v-model="novoItem.itemTipo">
                </v-combobox>

                <label class="mr-sm-2" for="input-data">Data de aquisição:</label>
                <input style="margin-left: 2px; padding: 2px; border: 2px solid;" id="input-data" type="date"
                  v-model="novoItem.dataAquisicao" class="mb-2">
                <br>

                <label class="mr-sm-2" for="input-preco">Preço de aquisição</label>
                <v-text-field id="input-preco" v-model="novoItem.precoAquisicao" class="mb-2 mr-sm-2 mb-sm-0"
                  placeholde="0.00"></v-text-field>

                <label class="mr-sm-2" for="input-departamento">Departamento</label>
                <v-combobox id="input-departamento" label="Selecione o departamento" v-bind:items="departamentos"
                  v-model="novoItem.departamento" v-bind:value="null">
                </v-combobox>

                <label class="mr-sm-2" for="input-responsavel">Responsável</label>
                <v-text-field v-model="novoItem.responsavel" id="input-responsavel" class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Nome do Servidor"></v-text-field>

                <v-divider></v-divider>

                <div class="pa4">
                  <v-row>
                    <v-col>
                      <v-btn type="submit" color="blue" variant="elevated" @click="isActive.value = false">Criar</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn type="reset" color="red" variant="elevated">Limpar</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-form>
            </v-container>
          </v-card>
        </template>
      </v-dialog>
    </v-app-bar>

    <!-- Conteúdo principal da página -->
    <v-main>
      <!-- Tabela do iventário -->
      <div class="invent-table" v-if="tableView">
        <v-container>

          <v-table id="items-table">
            <!-- <v-table id="items-table" striped hover :per-page="perPage" :current-page="currentPage" v-bind:items="items"> -->
            <!-- v-bind:items="items | filterSearch(itemSearch)"> -->
            <thead>
              <tr>
                <th>Patrimonio</th>
                <th>Descricao</th>
                <th>Item Tipo</th>
                <th>Data de Aquisição</th>
                <th>Responsavel</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in items" :key="item.nome">
                <td>{{ item.patrimonio }}</td>
                <td>{{ item.descricao }}</td>
                <td>{{ item.itemTipo.nome }}</td>
                <td>{{ item.dataAquisicao }}</td>
                <td>{{ item.responsavel.nome }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </div>

      <!-- Cards do iventário -->
      <div class="invent-cards" v-if="cardView">
        <v-container>
          <v-row>
            <v-col v-for="item in items" :key="item.patrimonio">
              <!-- Dentro do v-for, o filtro deve ser invocado como um método -->
              <!-- <card-item v-bind:key="item.patrimonio" v-for="item in filterSearch(items, itemSearch)" -->
              <card-item v-bind:item="item">
              </card-item>
            </v-col>
          </v-row>
        </v-container>

      </div>
    </v-main>
  </div>
</template>

<script setup lang="js">
// ===== FETCH DATA =====
const URL_SERVER = "http://127.0.0.1:3333/api/";
// https://stackoverflow.com/questions/75680934/nuxt3-nuxt-request-error-unhandled-500-fetch-failed-http-localhost#:~:text=%22dev%22%3A%20%22nuxt%20dev%20--host%200.0.0.0%22%20If%20the%20issue,an%20SSL%20issue%20or%20something%20with%20node%20v18
// https://nuxt.com/docs/api/composables/use-async-data
// https://nuxt.com/docs/api/utils/dollarfetch
const { data } = await useAsyncData('', () => $fetch(URL_SERVER + 'patrimonio'))

const items = reactive(data.value);

// ===== DATA ======
const show = ref(false);
const tableView = ref(true);
const cardView = ref(false);
const itemSearch = ref("ok");
const currentPage = ref(1);
const totalRows = ref(0);
const perPage = ref(3);
const url = ref('');

const listaTiposItens = reactive([
  "Escritório",
  "Sala de Aula",
  "Infraestrutura"
]);

const departamentos = reactive([
  "CAE",
  "Informática",
  "Almoxarifado"
]);

const novoItem = ref({
  patrimonio: "",
  descricao: "",
  itemTipo: "",
  dataAquisicao: null,
  precoAquisicao: 0.00,
  departamento: "",
  responsavel: ""
});

// ===== METHODS ======
function createNewItem (event) {
  $fetch(URL_SERVER + 'patrimonio', {
    method: 'POST',
    body: JSON.stringify(novoItem.value)
  })
  .then((response) => {
    console.log('Resposta do servidor obtida');
    updateItemList();
  })
  .catch((error) => {
    console.error('Não foi possível criar um novo item');
    console.log(error);

  });
};

function openCardView () {
  // Use o .value para alterar os valores das propriedades definidas acima;
  cardView.value = true;
  tableView.value = false;
};

function openTabView () {
  cardView.value = false;
  tableView.value = true;
}

function updateItemList () {
  $fetch(URL_SERVER + 'patrimonio').then(data => {
    items.value = data;
  })
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

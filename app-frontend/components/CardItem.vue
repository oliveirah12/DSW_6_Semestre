<template>
  <div>
    <v-card
      tag="article"
      width="250"
      v-bind:title="item.itemTipo.nome"
      v-bind:sub-title="item.patrimonio"
      class="mb-2"
    >
      <v-img
        v-bind:src="item.itemTipo.imagem"
        cover
        class="card-image"
      ></v-img>
      <v-card-text>
        <b>Responsável:</b> <br/>
        {{ item.responsavel.prontuario }} -
        {{ item.responsavel.nome }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  data: function () {
    return {
    }
  },
  props: ['item'],
}
</script>

<style>
.card-image {
    height: 130px; 
    object-fit: cover; 
    object-position: "center";
}
</style>

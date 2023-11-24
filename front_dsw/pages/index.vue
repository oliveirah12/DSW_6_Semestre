<template>
  <div class="page-container">
    <div class="button-container">
      <button class="button" @click="redirectToStatus">Home</button>
    </div>
  </div>
</template>
  
<script>
  export default {
      methods: {
        redirectToStatus() {
          this.$router.push('/status'); 
        },
      },
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
  
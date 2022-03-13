<template>
  <div id="app">
    <div class="loading" v-if="isLoading">Yükleniyor lütfen bekleyin...</div>
    <div class="loading" v-else-if="isError">{{ isError }}</div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<style>
@import "./style/style.min.css";
</style>
<script>
import {mapGetters} from 'vuex'
export default {
  name:"App",
  created(){
    this.$store.dispatch("getData");
  },
  computed:{
    ...mapGetters(["isLoading","isError"])
  }
}
</script>
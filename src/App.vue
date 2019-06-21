<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view/>
  </div>
</template>

<script>
import header from "@/components/header/header.vue";
export default {
  name: "App",
  components: {
    headerBar: header
  }
};
</script>

<style>
 /* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}  */
</style>


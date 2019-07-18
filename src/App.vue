<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view/>
    <footer-bar></footer-bar>
    <vueToTop top=300 right=45 bottom=120 color=#757373 duration=200></vueToTop>
  </div>
</template>

<script>
import header from "@/components/header/header.vue";
import footer from "@/components/footer/footer.vue";
export default {
  name: "App",
  components: {
    headerBar: header,
    footerBar:footer
  },
  created() {
    if (sessionStorage.getItem("store")) {
      //页面加载前读取sessionStorage里的状态信息
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    window.addEventListener("beforeunload", () => {
      //在页面刷新前将vuex里的信息保存到sessionStorage里
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
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


<template>
  <div class="other-page"></div>
</template>

<script>
import "@/assets/css/other.css";
import { mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["changeOpenClass", "changePreloaderShow"])
  },
  mounted() {
    this.changeOpenClass("");
  }
};
</script>

<template>
  <div id="page" :class="searchOpenClass">
    ceshi 
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
    };
  },
   computed: {
    ...mapGetters(["searchOpenClass"])
  },
};
</script>

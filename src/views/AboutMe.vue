<template>
    <div class="me-page">
    </div>
</template>

<script>
import '@/assets/css/aboutMe.css'
import { mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["changeOpenClass", "changePreloaderShow"])
  },
  mounted() {
    this.changeOpenClass("");
  }

}  
</script>

<template>
    <div class="me-page">
        <div class="me-panel">
        <div class="me-title">About Me</div>
        <div class="details">现居北京，Java后端开发从业者，日常为插画与设计爱好者，期待未来某一天可以从事文学或艺术类工作。
            热爱国风文化与旅行，希望有生之年可以遍历山川。想做的事情太多，不知道能达成几件，仅以此站记叙，督促自己多做多思。联系方式：weixy0725@aliyun.com</div>
        </div>
    </div>
</template>
<style src="@/assets/css/aboutMe.css" scoped></style>
<script>
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

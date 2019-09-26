<template>
  <div class="file-page">
    <div class="file-panel">
      <div class="file-title">归 档</div>
      <div class="details">
        <el-timeline :reverse="false">
          <el-timeline-item
            v-for="activity in activities"
            :key="activity.articleId"
            :timestamp="activity.datetime" placement="top"
          >
          <router-link
              :to="{path:'/article', query: { articleId: activity.articleId}}"
              target="_self"
              class="link-class"
            >
           {{activity.articleName}}
          </router-link>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<style src="@/assets/css/file.css" scoped></style>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      fileURL: this.host + "/articleManagement/blogAllArticles",
      activities:[]
    };
  },
  mounted() {
    this.changeOpenClass("");
    this.getArticles();
  },  
  methods: {
     ...mapMutations(["changeOpenClass", "changePreloaderShow"]),
    getArticles() {
      let _this = this;
      var parameters = {};
      this.$axios
        .get(this.fileURL, {
          params: parameters
        })
        .then(res => {
          if (res.data.result.code == 0) {
            this.activities = res.data.array;
          } else if (res.data.result.code == 1) {
            this.$router.push("/");
            this.$message({
              type: "warning",
              message: res.data.result.info
            });
          } else if (res.data.result.code == -1) {
            this.$message({
              type: "warning",
              message: res.data.result.developInfo
            });
          }
        });
    }
  }
};
</script>
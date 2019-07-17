<template>
  <div class="article-page">
    <div class="article">
    <div class="title">    
      <div v-if="isOriginal==3" class="ui label copy">临摹</div>
      <div v-if="isOriginal==2" class="ui label practice">练习</div>
      <div v-if="isOriginal==1" class="ui label own">原创</div>
      <div v-if="isOriginal==0" class="ui label other">转载</div>   
      <div v-if="isOriginal==4" class="ui label learn">学习</div>  
      <div class="title-content">{{articleName}}</div>
      <div class="d-line"></div>  
    </div>
    <div class="content">
       <div v-html="articleContent"></div>
       <div class="content-footer">
          <label>浏览次数：</label>
          <span>{{browseTimes}}</span>
          <label>留言数量：</label>
          <span>{{messageCount}}</span>
          <label>发布日期：</label>
          <span>{{fomartTime(datetime)}}</span>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/article.css";
import "@/assets/css/labelUI.css";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      articleURL: this.host + "/articleManagement/article",
      articleName: "",
      articleContent: "",
      isOriginal:'',
      browseTimes: 0,
      datetime: "",
      messageCount: 0,
      dialogVisible: false,
      textarea: "",
      articleId: "",
      list: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10
    };
  },
  computed: {
    ...mapGetters(["preloaderShow"])
  },
  methods: {
     ...mapMutations(["changePreloaderShow"]),
    getArticle() {
      let _this = this;
      var parameters = {};
      this.articleId = this.$route.query.articleId;
      parameters["articleId"] = this.articleId;
      this.changePreloaderShow(true);
      this.$axios
        .get(this.articleURL, {
          params: parameters
        })
        .then(res => {
          if (res.data.result.code == 0) {
            this.articleName = res.data.object.articleName;
            this.articleContent = res.data.object.articleContent;
            this.isOriginal = res.data.object.isOriginal;
            this.browseTimes = res.data.object.browseTimes;
            this.datetime = res.data.object.datetime;
            this.messageCount = res.data.object.messageCount;
            this.changePreloaderShow(false);
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
    },
    fomartTime(time){
      var str = time.split(" ");
      return str[0];
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>
<style scoped>
.content{
  color:#413e3e;
}
.content >>> img{
  position: relative;
  max-width: 100%;
  vertical-align: middle;
  overflow: hidden;
}
</style>



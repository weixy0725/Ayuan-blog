<template>
    <div class="result-page">
    <div class="tech-articles">
        <div class="m-search">
        <input placeholder="输入搜索内容..." v-model="searchText">
        <button @click="search()"><i class="iconfont icon-alisousuo"></i></button>
      </div>
      <div class="result-title">
         检索结果如下：
      </div>
      <div class="tech-list">
        <ul>
          <li v-for="i in list" v-bind:key="i.articleId">
            <router-link
              :to="{path:'/article', query: { articleId: i.articleId}}"
              target="_self"
              class="link-class"
            >
              <div class="title">
                <div v-if="i.isOriginal==3" class="ui label copy">临摹</div>
                <div v-if="i.isOriginal==2" class="ui label practice">练习</div>
                <div v-if="i.isOriginal==1" class="ui label own">原创</div>
                <div v-if="i.isOriginal==0" class="ui label other">转载</div>
                <div v-if="i.isOriginal==4" class="ui label learn">学习</div>
                <div class="title-content" v-html="i.articleName"></div>
              </div>
              <div class="content" v-html="i.articleSummarize">
              </div>
              <div class="content-detail" v-html="i.articleContent"></div>
              <div class="article-footer">
                <div class="f-classification" v-html="i.classificationName"></div>
                <div class="f-time">{{fomartTime(i.time)}}</div>
              </div>
            </router-link>
            <div class="divide"></div>
          </li>
        </ul>
      </div>
     </div>
     <div class="pagination-bar">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="pageNumber"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    </div>
</template>
<style src="@/assets/css/searchResult.css" scoped></style>
<script>
import "@/assets/css/labelUI.css";
import { mapGetters, mapMutations } from "vuex";
export default {
    data(){
        return{
            searchURL:this.host + "/articleManagement/searchArticles",
            list: [],
            searchText:'',
            total: 0,
            pageNumber: 1,
            pageSize: 10,
        }
    },
  computed: {
    ...mapGetters(["preloaderShow"])
  },
  methods: {
     ...mapMutations([ "changeOpenClass","changePreloaderShow"]),
     handleSizeChange(val) {
      this.pageSize = val;
      this.getMessage();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getMessage();
      console.log(`当前页: ${val}`);
    },
    fomartTime(time){
      var str = time.split(" ");
      return str[0];
    },
    getParamter(){
        this.searchText = this.$route.query.text;
        this.getArticles()
    },
    search(){
        this.getArticles()
    },
    getArticles() {
      let _this = this;
      var parameters = {};
      parameters["text"] = this.searchText;
      parameters["pageIndex"] = this.pageNumber;
      parameters["pageSize"] = this.pageSize;
      this.changePreloaderShow(true);
      this.$axios
        .get(this.searchURL, {
          params: parameters
        })
        .then(res => {
          if (res.data.result.code == 0) {
            this.list=res.data.array;
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
  },
  mounted() {
    this.getParamter();
    this.changeOpenClass("");
  }
}
</script>


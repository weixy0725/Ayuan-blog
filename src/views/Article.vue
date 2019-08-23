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
     <div class="mes-class">
      <div>
        <el-button
          type="info"
          class="mes-button"
          plain
          @click="dialogVisible = true"
        >留 言</el-button>
        <ul style="list-style-type: none;">
          <li v-for="i in list" v-bind:key="i.id">
            <div v-if="i.type==0" class="response-class">
              <label class="ui label blog-owner">作者</label>
              <span style="padding-left:2em;font-size: 0.5em;">{{i.datetime}}</span>
              <div class="response-content">
                <label class="response-person">@{{i.ip}}</label>
                {{i.message}}
              </div>
            </div>
            <div v-else class="message-class">
              <label class="ui label per">{{i.ip}}</label>
              <span style="padding-left:2em;font-size: 0.5em;">{{i.datetime}}</span>
              <div class="message-content">{{i.message}}</div>
            </div>
          </li>
        </ul>
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
    </div>
    <el-dialog title="留 言" :visible.sync="dialogVisible" width="50%" :modal-append-to-body="false">
      <el-input
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 16}"
        placeholder="请输入内容"
        v-model="textarea"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="info" @click="saveMessage()">留 言</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style src="@/assets/css/article.css" scoped></style>
<script>
import "@/assets/css/labelUI.css";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      articleURL: this.host + "/articleManagement/article",
      saveMessageURL: this.host + "/messageManagement/message",
      getMessageURL: this.host + "/messageManagement/message",
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
     ...mapMutations([ "changeOpenClass","changePreloaderShow"]),
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
    },
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
    saveMessage() {
      var formData = new FormData();
      if (this.textarea == "") {
        this.$message.error("留言内容不可为空！");
      } else {
        formData.append("message", this.textarea);
        formData.append("type", 1); //留言的type为1
        formData.append("articleId", this.articleId);
        this.$axios.post(this.saveMessageURL, formData).then(res => {
          if (res.data.result.code == 0) {
            this.dialogVisible = false;
            this.$message.info("留言成功");
            this.textarea = "";
            this.getMessage();
          } else if (res.data.result.code == 1) {
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
    },
    getMessage() {
      let _this = this;
      var parameters = {};
      parameters["articleId"] = this.articleId;
      parameters["pageIndex"]=this.pageNumber;
      parameters["pageSize"]=this.pageSize;
      this.$axios
        .get(this.getMessageURL, {
          params: parameters
        })
        .then(res => {
          if (res.data.result.code == 0) {
            this.list = res.data.array;
            this.total = res.data.object.count;
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
  },
  mounted() {
    this.getArticle();
    this.changeOpenClass("");
    this.getMessage();
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



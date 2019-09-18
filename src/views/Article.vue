<template>
  <div class="article-page" v-wechat-title="'Ayuan既往随叙-'+this.title">
    <div class="article">
      <div class="title">
        <div class="title-content">
          <div v-if="isOriginal==3" class="ui label copy">临摹</div>
          <div v-if="isOriginal==2" class="ui label practice">练习</div>
          <div v-if="isOriginal==1" class="ui label own">原创</div>
          <div v-if="isOriginal==0" class="ui label other">转载</div>
          <div v-if="isOriginal==4" class="ui label learn">学习</div>
          <div v-if="isOriginal==5" class="ui label tag">记录</div>
          {{articleName}}
        </div>
        <div class="d-line"></div>
      </div>
      <div class="content">
        <div v-html="articleContent"></div>
        <div class="content-footer">
          <label>浏览:</label>
          <span>{{browseTimes}}</span>&nbsp;
          <label>留言:</label>
          <span>{{messageCount}}</span>&nbsp;
          <label>日期:</label>
          <span>{{fomartTime(datetime)}}</span>
        </div>
      </div>
    </div>
    <div class="mes-class">
      <div class="mmes">
        <el-button type="info" class="mes-button" plain @click="showMessageTable()">{{messageTable}}</el-button>
        <div class="sys-message" v-show="dialogVisible">
          <el-form ref="form" :model="form" label-width="40px">
            <el-form-item label="昵称">
              <el-input v-model="form.nickname" placeholder="(非必填)请输入您的昵称"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" placeholder="(非必填)邮件通知回复"></el-input>
            </el-form-item>
            <el-form-item label="留言">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 16}"
                placeholder="请输入内容"
                v-model="form.textarea"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" plain @click="saveMessage()">留 言</el-button>
            </el-form-item>
          </el-form>
        </div>
        <ul style="list-style-type: none;">
          <li v-for="i in list" v-bind:key="i.id">
            <div v-if="i.type==0" class="response-class">
              <label class="ui label blog-owner">作者</label>
              <span style="padding-left:10px;font-size:12px;">{{i.datetime}}</span>
              <div class="response-content">
                <label class="response-person">@{{i.nickname}}</label>
                {{i.message}}
              </div>
            </div>
            <div v-else class="message-class">
              <label class="ui label per">{{i.nickname}}</label>
              <span style="padding-left:10px;font-size:12px;">{{i.datetime}}</span>
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
    <!-- <el-dialog title="留 言" :visible.sync="dialogVisible" width="65%" :close-on-click-modal="false">
      
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>-->
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
      isOriginal: "",
      browseTimes: 0,
      datetime: "",
      messageCount: 0,
      dialogVisible: false,
      articleId: "",
      list: [],
      total: 0,
      pageNumber: 1,
      pageSize: 10,
      title: "文章",
      form: {
        nickname: "",
        email: "",
        textarea: ""
      },
      messageTable:"留 言"
    };
  },
  computed: {
    ...mapGetters(["preloaderShow"])
  },
  methods: {
    ...mapMutations(["changeOpenClass", "changePreloaderShow"]),
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
            this.title = res.data.object.articleName;
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
    fomartTime(time) {
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
      if (this.form.textarea == "") {
        this.$message.error("留言内容不可为空！");
      } else {
        formData.append("message", this.form.textarea);
        if(this.form.nickname!=''){
           formData.append("nickname", this.form.nickname);
        }
        if(this.form.email!=''){
           formData.append("email", this.form.email);
        }
        formData.append("type", 1); //留言的type为1
        formData.append("articleId", this.articleId);
        this.$axios.post(this.saveMessageURL, formData).then(res => {
          if (res.data.result.code == 0) {
            this.dialogVisible = false;
            this.$message.info("留言成功");
            this.form.textarea = "";
            this.form.nickname="";
            this.form.email="";
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
      parameters["pageIndex"] = this.pageNumber;
      parameters["pageSize"] = this.pageSize;
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
    },
    showMessageTable(){
      if(this.dialogVisible==true){
           this.dialogVisible=false;
           this.messageTable="留 言";
      }else{
           this.dialogVisible=true;
           this.messageTable="收起留言板";
      }
    }
  },
  created() {},
  mounted() {
    this.getArticle();
    this.changeOpenClass("");
    this.getMessage();
  }
};
</script>
<style scoped>
.content {
  color: #413e3e;
}
.content >>> img {
  position: relative;
  max-width: 100%;
  vertical-align: middle;
  overflow: hidden;
}
</style>



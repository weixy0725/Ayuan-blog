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
              <div :class="pBody?'OwO':'OwO OwO-open'">
                    <div class="OwO-logo" @click="pBody=!pBody">
                        <span>_(:з」∠)_表情</span>
                    </div>
                    <div class="OwO-body">
                        <ul class="OwO-items OwO-items-show">
                            <li class="OwO-item" v-for="(oitem,index) in OwOlist" :key="'oitem'+index" @click="choseEmoji(oitem.title)">
                                <img :src="'http://39.105.221.186:80/'+oitem.url" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                
            </el-form-item>
            <!-- <el-form-item label="">
              <hua ref="verify_plug" @verify_pass="verify_pass"></hua>
            </el-form-item> -->
            <el-form-item>
              <el-button @click="showMessageTable()" size="small" >取 消</el-button>
              <el-button type="primary" plain @click="saveMessage()" size="small">留 言</el-button>
            </el-form-item>
          </el-form>
        </div>
        <ul style="list-style-type: none;">
          <li v-for="i in list" v-bind:key="i.id">
            <div v-if="i.type==0" class="response-class">
              <label class="ui label blog-owner">Ayuan</label>
              <span style="padding-left:10px;font-size:12px;">{{i.datetime}}</span>
              <div class="response-content">
                <label class="response-person">@{{i.nickname}}</label>
                <div class="response-html" v-html="analyzeEmoji(i.message)">{{analyzeEmoji(i.message)}}</div>
              </div>
            </div>
            <div v-else class="message-class">
              <label class="ui label per">{{i.nickname}}</label>
              <span style="padding-left:10px;font-size:12px;">{{i.datetime}}</span>
              <div class="message-content" v-html="analyzeEmoji(i.message)" >{{analyzeEmoji(i.message)}}</div>
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
import hua from "@/components/hua/hua.vue";
export default {
  components: {
    hua: hua,
  },
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
      messageTable:"留 言",
      huaFlag:false,
      pBody:true,//表情打开控制
      OwOlist:[//表情包和表情路径
                   {'title':'微笑','url':'weixiao.gif'},
                   {'title':'嘻嘻','url':'xixi.gif'},
                   {'title':'哈哈','url':'haha.gif'},
                   {'title':'可爱','url':'keai.gif'},
                   {'title':'可怜','url':'kelian.gif'},
                   {'title':'挖鼻','url':'wabi.gif'},
                   {'title':'吃惊','url':'chijing.gif'},
                   {'title':'害羞','url':'haixiu.gif'},
                   {'title':'挤眼','url':'jiyan.gif'},
                   {'title':'闭嘴','url':'bizui.gif'},
                   {'title':'鄙视','url':'bishi.gif'},
                   {'title':'爱你','url':'aini.gif'},
                   {'title':'泪','url':'lei.gif'},
                   {'title':'偷笑','url':'touxiao.gif'},
                   {'title':'亲亲','url':'qinqin.gif'},
                   {'title':'生病','url':'shengbing.gif'},
                   {'title':'太开心','url':'taikaixin.gif'},
                   {'title':'白眼','url':'baiyan.gif'},
                   {'title':'右哼哼','url':'youhengheng.gif'},
                   {'title':'左哼哼','url':'zuohengheng.gif'},
                   {'title':'嘘','url':'xu.gif'},
                   {'title':'衰','url':'shuai.gif'},
                   {'title':'吐','url':'tu.gif'},
                   {'title':'哈欠','url':'haqian.gif'},
                   {'title':'抱抱','url':'baobao.gif'},
                   {'title':'怒','url':'nu.gif'},
                   {'title':'疑问','url':'yiwen.gif'},
                   {'title':'馋嘴','url':'chanzui.gif'},
                   {'title':'拜拜','url':'baibai.gif'},
                   {'title':'思考','url':'sikao.gif'},
                   {'title':'汗','url':'han.gif'},
                   {'title':'困','url':'kun.gif'},
                   {'title':'睡','url':'shui.gif'},
                   {'title':'钱','url':'qian.gif'},
                   {'title':'失望','url':'shiwang.gif'},
                   {'title':'酷','url':'ku.gif'},
                   {'title':'色','url':'se.gif'},
                   {'title':'哼','url':'heng.gif'},
                   {'title':'鼓掌','url':'guzhang.gif'},
                   {'title':'晕','url':'yun.gif'},
                   {'title':'悲伤','url':'beishang.gif'},
                   {'title':'抓狂','url':'zhuakuang.gif'},
                   {'title':'黑线','url':'heixian.gif'},
                   {'title':'阴险','url':'yinxian.gif'},
                   {'title':'怒骂','url':'numa.gif'},
                   {'title':'互粉','url':'hufen.gif'},
                   {'title':'书呆子','url':'shudaizi.gif'},
                   {'title':'愤怒','url':'fennu.gif'},
                   {'title':'感冒','url':'ganmao.gif'},
                   {'title':'心','url':'xin.gif'},
                   {'title':'伤心','url':'shangxin.gif'},
                   {'title':'猪','url':'zhu.gif'},
                   {'title':'熊猫','url':'xiongmao.gif'},
                   {'title':'兔子','url':'tuzi.gif'},
                   {'title':'喔克','url':'ok.gif'},
                   {'title':'耶','url':'ye.gif'},
                   {'title':'棒棒','url':'good.gif'},
                   {'title':'不','url':'no.gif'},
                   {'title':'赞','url':'zan.gif'},
                   {'title':'来','url':'lai.gif'},
                   {'title':'弱','url':'ruo.gif'},
                   {'title':'草泥马','url':'caonima.gif'},
                   {'title':'神马','url':'shenma.gif'},
                   {'title':'囧','url':'jiong.gif'},
                   {'title':'浮云','url':'fuyun.gif'},
                   {'title':'给力','url':'geili.gif'},
                   {'title':'围观','url':'weiguan.gif'},
                   {'title':'威武','url':'weiwu.gif'},
                   {'title':'话筒','url':'huatong.gif'},
                   {'title':'蜡烛','url':'lazhu.gif'},
                   {'title':'蛋糕','url':'dangao.gif'},
                   {'title':'发红包','url':'fahongbao.gif'}
                ]
    };
  },
  computed: {
    ...mapGetters(["preloaderShow"])
  },
  methods: {
    ...mapMutations(["changeOpenClass", "changePreloaderShow"]),
    verify_pass(){
      this.huaFlag=true;
    },
    choseEmoji:function(inner){
              this.form.textarea +='[' + inner + ']';
    },
    analyzeEmoji:function(cont){//编译表情替换成图片展示出来
              var pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
                var pattern2 = /\[[\u4e00-\u9fa5]+\]/;
                var content = cont.match(pattern1);
                var str = cont;
                if(content){
                    for(var i=0;i<content.length;i++){
                        for(var j=0;j<this.OwOlist.length;j++){
                            if("["+this.OwOlist[j].title +"]" == content[i]){
                                var src = this.OwOlist[j].url;
                                break;
                            }
                        }
                        str = str.replace(pattern2,'<img src="http://39.105.221.186:80/'+src+'"/>');
                    }
                    // console.log(str);
                }
                return str;
    },
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



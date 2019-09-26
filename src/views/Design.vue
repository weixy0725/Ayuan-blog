<template>
  <div class="pic-page">
    <div class="pic-articles">
      <div class="pic-select">
        <div class="classification-select">
          <div class="downSelect" @click="changeSelect">
            {{selectTitle}}
            <i class="iconfont icon-alixiajiantou"></i>
          </div>
          <div id="downOptions" :class="selectOpen">
            <ul>
              <li
                v-for="i in classificationList"
                v-bind:key="i.classificationId"
                class="moption"
                @click="changeSelectTitle(i.classificationId,i.classification)"
              >{{i.classification}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pic-list clearfix">
        <div class="pic-box" v-for="i in list" v-bind:key="i.articleId">
          <router-link
              :to="{path:'/article', query: { articleId: i.articleId}}"
              target="_self"
              class="link-class"
          >
          <div class="pic-bg" v-bind:style="{'background-image':'url('+imgURLHeader+i.cover+')'}">
            <span class="foverlay"></span>
          </div>
          <div class="pic-bar">
            <div class="pic-title">
              <div class="pic-title-content">{{i.articleName}}</div>
            </div>
            <div class="pic-details">
              <div v-if="i.isOriginal==3" class="ui label copy">临摹</div>
                <div v-if="i.isOriginal==2" class="ui label practice">练习</div>
                <div v-if="i.isOriginal==1" class="ui label own">原创</div>
                <div v-if="i.isOriginal==0" class="ui label other">转载</div>
                <div v-if="i.isOriginal==4" class="ui label learn">学习</div>
              <div class="p-classification">{{i.classification}}</div>
              <div class="eye">
                <i class="iconfont icon-aliliulan"></i> {{i.browseTimes}}
              </div>
              <div class="message">
                <i class="iconfont icon-aliliuyan"></i> {{i.messageCount}}
              </div>
            </div>
          </div>
          </router-link>
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
  </div>
</template>
<style src="@/assets/css/design.css" scoped></style>
<script>
import "@/assets/css/labelUI.css";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      articlesURL: this.host + "/articleManagement/blogArticles",
      classificationsURL: this.host + "/articleManagement/classification",
      selectOpen: "",
      selectShow: false,
      selectTitle: "全部内容",
      total: 0,
      typeId: 2,
      pageNumber: 1,
      pageSize: 10,
      classificationList: [],
      list: [],
      classificationId: -1
    };
  },
  computed: {
    ...mapGetters(["imgURLHeader"])
  },
  methods: {
    ...mapMutations(["changeOpenClass","changePreloaderShow"]),
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.search();
    },
    changeSelect() {
      if (this.selectShow) {
        this.selectOpen = "";
        this.selectShow = false;
      } else {
        this.selectOpen = "open";
        this.selectShow = true;
      }
    },
    changeSelectTitle(id, title) {
      this.selectTitle = title;
      this.selectOpen = "";
      this.selectShow = false;
      this.classificationId = id;
      this.search();
    },
    search() {
      this.changePreloaderShow(true);
      var parameters = {};
      parameters["typeId"] = this.typeId;
      if (this.classificationId > 0) {
        parameters["classificationId"] = this.classificationId;
      }
      parameters["pageIndex"] = this.pageNumber;
      parameters["pageSize"] = this.pageSize;
      this.$axios
        .get(this.articlesURL, {
          params: parameters
        })
        .then(res => {
          if (res.data.result.code == 0) {
            this.list = res.data.array;
            this.total = res.data.object.count;
            this.changePreloaderShow(false);
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
    },
    getclassifications() {
      var parameters = {};
      parameters["typeId"] = this.typeId;
      this.$axios
        .get(this.classificationsURL, {
          params: parameters
        })
        .then(res => {
          if (res.data.result.code == 0) {
            this.classificationList.push({
              classificationId: "-1",
              classification: "全部内容"
            });
            for (let d of res.data.array) {
              this.classificationList.push(d);
            }
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
    },
    fomartTime(time) {
      var str = time.split(" ");
      return str[0];
    }
  },
  mounted() {
    this.search();
    this.getclassifications();
    this.changeOpenClass("");
  }
};
</script>

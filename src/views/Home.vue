<template>
  <div id="page">
    <div class="headertop">
      <div id="centerbg" style="background-image: url(http://39.105.221.186:80/center.jpg);">
        <div class="test">
          <!-- 左右倾斜 -->
          <!-- <div class="slant-left"></div>
          <div class="slant-right"></div> -->
          <div class="own-panel">
            <div>
              <router-link :to="{path:'/aboutMe'}" target="_self" class="link-class">
                <img src="http://39.105.221.186/touxiang.jpg" />
              </router-link>
            </div>
            <div class="own-info">
              <p>Ayuan</p>
            </div>
            <div class="own-social">
              <li>
                <a href="https://github.com/weixy0725" target="_blank">
                  <img src="@/assets/img/github.png" />
                </a>
              </li>
              <li>
                <a href="https://my.oschina.net/u/2478308" target="_blank">
                  <img src="@/assets/img/oschina.png" />
                </a>
              </li>
              <li>
                <a href="https://www.gracg.com/beishu" target="_blank">
                  <img src="@/assets/img/tuyawangguo.png" />
                </a>
              </li>
              <li>
                <a href="https://www.zcool.com.cn/u/19208618" target="_blank">
                  <img src="@/assets/img/zzcool.png" />
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--主页内容-->
    <!--推荐位-->
    <div class="recommend clearfix">
      <h3>推 荐</h3>
      <div class="recommend-one" v-bind:style="{'background-image':'url('+rmOneURL+')'}">
        <router-link
          :to="{path:'/article', query: { articleId: rmOneId}}"
          target="_self"
          class="link-class"
        >
          <span class="foverlay">{{rmOneTitle}}</span>
        </router-link>
      </div>
      <div class="recommend-two" v-bind:style="{'background-image':'url('+rmTwoURL+')'}">
        <router-link
          :to="{path:'/article', query: { articleId: rmTwoId}}"
          target="_self"
          class="link-class"
        >
          <span class="foverlay">{{rmTwoTitle}}</span>
        </router-link>
      </div>
      <div class="recommend-three" v-bind:style="{'background-image':'url('+rmThreeURL+')'}">
        <router-link
          :to="{path:'/article', query: { articleId: rmThreeId}}"
          target="_self"
          class="link-class"
        >
          <span class="foverlay">{{rmThreeTitle}}</span>
        </router-link>
      </div>
    </div>
    <!--推荐位结束-->
    <!--最近内容-->
    <div class="recent">
      <h3>近 况</h3>
      <div class="recent-articles">
        <ul>
          <li v-for="i in list" v-bind:key="i.articleId">
            <div class="t-classification ui label title">{{i.type}}</div>
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
                <div class="title-content">{{i.articleName}}</div>
              </div>
              <div class="content">{{i.articleSummarize}}</div>
              <div class="article-footer">
                <div class="f-classification">{{i.classification}}</div>
                <div class="f-time">{{fomartTime(i.datetime)}}</div>
                <div class="eye">
                  <i class="iconfont icon-aliliulan"></i>
                  {{i.browseTimes}}
                </div>
                <div class="message">
                  <i class="iconfont icon-aliliuyan"></i>
                  {{i.messageCount}}
                </div>
              </div>
            </router-link>
            <!-- <div class="divide"></div> -->
          </li>
        </ul>
      </div>
    </div>
    <!--最近内容结束-->
  </div>
</template>
<style src="@/assets/css/home.css" scoped>
</style>
<script>
import "@/assets/css/labelUI.css";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      articleURL: this.host + "/articleManagement/blogArticles",
      rmOneURL: "",
      rmTwoURL: "",
      rmThreeURL: "",
      rmOneTitle: "",
      rmTwoTitle: "",
      rmThreeTitle: "",
      rmOneId: "",
      rmTwoId: "",
      rmThreeId: "",
      list: []
    };
  },
  computed: {
    ...mapGetters(["imgURLHeader", "preloaderShow"])
  },
  methods: {
    ...mapMutations([
      "changeOpenClass",
      "changeSearchOpenClass",
      "changePreloaderShow"
    ]),
    search(typeId, pageIndex, pageSize) {
      var parameters = {};
      if (typeId != 0) {
        parameters["typeId"] = typeId;
      }
      parameters["pageIndex"] = pageIndex;
      parameters["pageSize"] = pageSize;
      this.$axios
        .get(this.articleURL, {
          params: parameters
        })
        .then(res => {
          if (res.data.result.code == 0) {
            if (typeId == 2) {
              this.rmOneURL = this.imgURLHeader + res.data.array[0].cover;
              this.rmTwoURL = this.imgURLHeader + res.data.array[1].cover;
              this.rmThreeURL = this.imgURLHeader + res.data.array[2].cover;
              this.rmOneTitle = res.data.array[0].articleName;
              this.rmTwoTitle = res.data.array[1].articleName;
              this.rmThreeTitle = res.data.array[2].articleName;
              this.rmOneId = res.data.array[0].articleId;
              this.rmTwoId = res.data.array[1].articleId;
              this.rmThreeId = res.data.array[2].articleId;
            } else {
              this.list = res.data.array;
            }
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
    fomartTime(time) {
      var str = time.split(" ");
      return str[0];
    }
  },
  mounted() {
    this.search(2, 1, 3);
    this.search(0, 1, 10);
    this.changeOpenClass("");
  }
};
</script>

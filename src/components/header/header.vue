<template>
  <div>
    <div class="header">
      <!--大分辨率的header-->
      <div class="max-header">
        <!-- <img src="@/assets/img/sakura-flower.png" class="max-logo">
        <img> -->
        <div class="max-header-nav">
          <ul>
            <li @click="toHome()">首页</li>
            <li @click="toTech()">技术栈</li>
            <li @click="toDesign()">插画与设计</li>
            <li @click="toOther()">杂记</li>
            <li @click="toFile()">归档</li>
            <li @click="toAboutMe()">About Me</li>
            <li @click="showSearch()" :class="searchOpenClass">
              <i class="iconfont icon-alisousuo"></i>
            </li>
          </ul>
        </div>
      </div>
      <!--小分辨率header-->
      <div class="middle-min-header">
        <div id="fold-nav" :class="openClass" @click="open">
          <div class="icon"></div>
        </div>
        <!-- <img src="@/assets/img/sakura-flower.png" class="min-logo"> -->
        <img>
      </div>
      <!--小分辨率header end-->
    </div>
    <!--左侧导航栏-->
    <div id="mo-nav" :class="openClass">
      <div class="m-avatar">
        <router-link :to="{path:'/aboutMe'}" target="_self" class="link-class">
        <img src="http://39.105.221.186/touxiang.jpg">
        </router-link>
      </div>
      <div class="m-search">
        <!-- <input placeholder="输入搜索内容..." v-model="searchText">
        <button @click="search()"><i class="iconfont icon-alisousuo"></i></button> -->
        <el-input placeholder="输入搜索内容..." v-model="searchText" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
      </div>
      <div class="nav-list">
        <div @click="toHome()">首页</div>
        <div @click="toTech()">技术栈</div>
        <div @click="toDesign()">插画与设计</div>
        <div @click="toOther()">杂记</div>
        <div @click="toFile()">归档</div>
        <div @click="toAboutMe()">About Me</div>
        <div> </div>
      </div>
    </div>
    <!--左侧导航栏 end-->
    <!--搜索工具栏-->
    <div id="searchBar" :class="searchOpenClass">
       <div class="m-search">
        <input placeholder="输入搜索内容..." v-model="searchText">
        <button @click="search()"><i class="iconfont icon-alisousuo"></i></button>
       </div>
    </div>
    <!--搜索工具栏 end-->
    <!--过渡动画-->
    <div id="preloader" v-show="preloaderShow">
      <div id="preloader-inner"></div>
    </div>
    <!--过渡动画 end-->
  </div>
</template>
<script>
import '@/assets/css/header.css'
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      //preloaderShow: true, //过渡动画显示/隐藏
      removeTimer: "", //过渡动画移除延时器
      schShow: true,
      searchText:""
    };
  },
  computed: {
    ...mapGetters(["openClass", "searchOpenClass","preloaderShow"])
  },
  methods: {
    ...mapMutations(["changeOpenClass", "changeSearchOpenClass","changePreloaderShow"]),
    // remove() {
    //      this.changePreloaderShow(false);
    // },
    toHome() {
      this.$router.push("/");
    },
    toTech() {
      this.$router.push("/technology");
    },
    toDesign() {
      this.$router.push("/design");
    },
    toOther() {
      this.$router.push("/other");
    },
    toAboutMe() {
      this.$router.push("/aboutMe");
    },
    toFile(){
      this.$router.push("/file");
    },
    open() {
      if (this.openClass=="") {
        this.changeOpenClass("open");
      } else {
        this.changeOpenClass("");
      }
    },
    showSearch() {
      if (this.schShow) {
        this.changeSearchOpenClass("open");
        this.schShow = false;
      } else {
        this.changeSearchOpenClass("");
        this.schShow = true;
      }
    },
    search(){
        if(this.searchText!=""&&this.searchText.replace(/" "/g,"")!=""){
          this.changeSearchOpenClass("");
          this.schShow = true;
          this.$router.push("/searchResult?text="+this.searchText);
          this.searchText="";
        }else{
          this.$message.info("搜索内容不能为空");
        }
    }
  },
  mounted() {
    //this.removeTimer = setInterval(this.remove, 2000); //延时执行隐藏
  }
};
</script>


<template>
  <div>
    <div class="header">
      <!--大分辨率的header-->
      <div class="max-header">
        <img src="@/assets/icon/leaf.png" class="max-logo">
        <img>
        <div class="max-header-nav">
          <ul>
            <li @click="toHome()">首页</li>
            <li @click="toTech()">技术栈</li>
            <li @click="toDesign()">插画与设计</li>
            <li @click="toOther()">杂记</li>
            <li @click="toAboutMe()">About me</li>
            <li @click="showSearch()" :class="searchOpenClass">
              <i class="iconfont icon-alisousuo"></i>
            </li>
          </ul>
        </div>
      </div>
      <!--小分辨率header-->
      <div class="middle-min-header">
        <div :class="foldNavClass" @click="open">
          <div class="icon"></div>
        </div>
        <img src="@/assets/icon/leaf.png" class="min-logo">
        <img>
      </div>
      <!--小分辨率header end-->
    </div>
    <!--左侧导航栏-->
    <div id="mo-nav" :class="openClass">
      <div class="m-avatar">
        <img src="@/assets/icon/leaf.png">
      </div>
      <div class="m-search">
        <form class="m-search-form" method="post" action role="search">
          <input class="m-search-input" type="search" name="inputSearch" placeholder="输入搜索内容...">
        </form>
      </div>
      <div class="nav-list">
        <div @click="toHome()">首页</div>
        <div @click="toTech()">技术栈</div>
        <div @click="toDesign()">插画与设计</div>
        <div @click="toOther()">杂记</div>
        <div @click="toAboutMe()">About me</div>
      </div>
    </div>
    <!--左侧导航栏 end-->
    <!--搜索工具栏-->
    <div id="searchBar" :class="searchOpenClass">
      <div class="m-search">
        <form class="m-search-form" method="post" action role="search">
          <input class="m-search-input" type="search" name="inputSearch" placeholder="输入搜索内容...">
        </form>
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
      preloaderShow: false, //过渡动画显示/隐藏
      removeTimer: "", //过渡动画移除延时器
      show: true,
      foldNavClass: "fold-nav",
      schShow: true
    };
  },
  computed: {
    ...mapGetters(["openClass", "searchOpenClass"])
  },
  methods: {
    ...mapMutations(["changeOpenClass", "changeSearchOpenClass"]),
    remove() {
      this.preloaderShow = false;
    },
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
    open() {
      if (this.show) {
        this.changeOpenClass("open");
        this.foldNavClass = this.foldNavClass + " " + this.openClass;
        this.show = false;
      } else {
        this.foldNavClass = "fold-nav";
        this.changeOpenClass("");
        this.show = true;
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
    }
  },
  mounted() {
    this.removeTimer = setInterval(this.remove, 2000); //延时执行隐藏
  }
};
</script>


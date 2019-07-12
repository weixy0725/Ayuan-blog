<template>
  <div id="page" :class="searchOpenClass">
    <div class="headertop">
      <!-- <div id="centerbg" style="background-image: url(http://39.105.221.186:80/30e90a80ac084ec6a2d7fb6c55146b48.jpg);"> -->
      <div id="centerbg" style="background-image: url(http://39.105.221.186:80/centerbg.jpg);">
        <!-- 左右倾斜 -->
        <div class="slant-left"></div>
        <div class="slant-right"></div>
        <!-- 博主信息 -->
        <div class="focusinfo">
          <!-- 头像 -->
          <div class="header-tou">
            <a href>
              <img src="@/assets/icon/leaf.png" />
            </a>
          </div>
          <!-- 简介 -->
          <div class="header-info">
            <p>Ayuan的治愈空间</p>
          </div>
          <!-- 社交信息 -->
          <div class="top-social">
            <li>
              <a
                href
                target="_blank"
                rel="nofollow noopener noreferrer"
                class="social-sina"
                title="sina"
              >
                <img src="@/assets/icon/leaf.png" />
              </a>
            </li>
            <li class="qq">
              <a href target="_blank" rel="nofollow noopener noreferrer">
                <img src="@/assets/icon/leaf.png" />
              </a>
            </li>
            <li>
              <a
                href
                target="_blank"
                rel="nofollow noopener noreferrer"
                class="social-qzone"
                title="qzone"
              >
                <img src="@/assets/icon/leaf.png" />
              </a>
            </li>
            <li>
              <a
                href
                target="_blank"
                rel="nofollow noopener noreferrer"
                class="social-github"
                title="github"
              >
                <img src="@/assets/icon/leaf.png" />
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>

    <!--主页内容-->
    <!--推荐位-->
    <div class="recommend">
      <h3>推 荐</h3>
      <div class="recommend-one" :style="[rmOneURL]">
        <span class="foverlay">文章1</span>
      </div>
      <div class="recommend-two" :style="[rmTwoURL]">
        <span class="foverlay">文章2</span>
      </div>
      <div class="recommend-three" :style="[rmThreeURL]">
        <span class="foverlay">文章3</span>
      </div>
    </div>
    <!--推荐位结束-->
    <!--最近内容-->
    <div class="recent">
      <h3>近 况</h3>
      <div class="recent-articles">
        <ul>
          <li>
            <div class="title">
			  <div class="t-classification">❀技术栈❀</div>
              <div class="title-content">这是文章标题我我我我我我我我我我我我我我我我我我我我我我我我我我我我</div>
            </div>
            <div class="content">
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
			</div> 
			<div class="article-footer">
                <div class="f-classification">数据结构与算法</div>
				<div class="f-time">2019-07-12</div>
				<div class="eye"><i class="iconfont icon-aliliulan"></i> 25</div>
				<div class="message"><i class="iconfont icon-aliliuyan"></i> 25</div>
			</div>
		    <div class="divide"></div>
          </li>
		  <li>
            <div class="title">
			  <div class="t-classification">❀技术栈❀</div>
              <div class="title-content">这是文章标题我我我我我我我我我我我我我我我我我我我我我我我我我我我我</div>
            </div>
            <div class="content">
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
			</div> 
			<div class="article-footer">
                <div class="f-classification">数据结构与算法</div>
				<div class="f-time">2019-07-12</div>
				<div class="eye"><i class="iconfont icon-aliliulan"></i> 25</div>
				<div class="message"><i class="iconfont icon-aliliuyan"></i> 25</div>
			</div>
		    <div class="divide"></div>
          </li>
		   <li>
            <div class="title">
			  <div class="t-classification">❀技术栈❀</div>
              <div class="title-content">这是文章标题我我我我我我我我我我我我我我我我我我我我我我我我我我我我</div>
            </div>
            <div class="content">
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
				这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏这是文章内容内偶人跟内屏
			</div> 
			<div class="article-footer">
                <div class="f-classification">数据结构与算法</div>
				<div class="f-time">2019-07-12</div>
				<div class="eye"><i class="iconfont icon-aliliulan"></i> 25</div>
				<div class="message"><i class="iconfont icon-aliliuyan"></i> 25</div>
			</div>
		    <div class="divide"></div>
          </li>
        </ul>
      </div>
    </div>
    <!--最近内容结束-->
	<div class="footer-divide"></div>
	<div class="home-footer">
        Copyright © 2019 by Ayuan
	</div>
  </div>
</template>
<script>
import "@/assets/css/home.css";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      rmOneURL: {
        "background-image":
          "url(http://39.105.221.186/c1938dab7e5c4d2b8190506c5a0e0a71.jpg)"
      },
      rmTwoURL: {
        "background-image":
          "url(http://39.105.221.186:80/555130ad7fd24c0c934b382973a72dd4.jpg)"
      },
      rmThreeURL: {
        "background-image":
          "url(http://39.105.221.186:80/56a85b30fa2b4c90809d193d9134dde7.jpg)"
      }
    };
  },
  computed: {
    ...mapGetters(["searchOpenClass"])
  }
};
</script>

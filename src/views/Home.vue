<template>
  <div id="page" :class="searchOpenClass">
    <div id="centerbg" style="background-image: url(http://39.105.221.186:80/30e90a80ac084ec6a2d7fb6c55146b48.jpg);">
			<!-- 左右倾斜 -->
			<!-- <div class="slant-left"></div>
			<div class="slant-right"></div> -->
			<!-- 博主信息 -->
			<!-- <div class="focusinfo"> -->
				<!-- 头像 -->
				<!-- <div class="header-tou">
				<a href="https://zhebk.cn/"><img src="@/assets/icon/leaf.png"></a>
				</div> -->
				<!-- 简介 -->
				<!-- <div class="header-info">
				<p>Ayuan的治愈空间</p>
				</div> -->
				<!-- 社交信息 -->
				<!-- <div class="top-social">
					<li><a href="" target="_blank" rel="nofollow noopener noreferrer" class="social-sina" title="sina"><img src="@/assets/icon/leaf.png"></a></li>
					<li class="qq"><a href="" target="_blank" rel="nofollow noopener noreferrer"><img src="@/assets/icon/leaf.png"></a>
					</li>
					<li><a href="" target="_blank" rel="nofollow noopener noreferrer" class="social-qzone" title="qzone"><img src="@/assets/icon/leaf.png"></a></li>
					<li><a href="" target="_blank" rel="nofollow noopener noreferrer" class="social-github" title="github"><img src="@/assets/icon/leaf.png"></a></li>
				</div>
			</div> -->
		</div>
  </div>
</template>
<script>
import '@/assets/css/home.css'
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
    };
  },
   computed: {
    ...mapGetters(["searchOpenClass"])
  },
};
</script>

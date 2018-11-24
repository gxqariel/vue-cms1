<template>
	<div>
		<!-- 轮播图 -->
		<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
		<!-- 6宫格 -->
		  <ul class="mui-table-view mui-grid-view mui-grid-6">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 "><router-link to="/home/newslist">
					<img src="../../images/menu1.png" alt="">
					<div class="mui-media-body">新闻资讯</div></router-link></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 "><router-link to="/home/photolist">
					<img src="../../images/menu2.png" alt="">
					<div class="mui-media-body">图片分享</div></router-link></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 "><router-link to="/home/goodslist">
					<img src="../../images/menu3.png" alt="">
					<div class="mui-media-body">商品购买</div></router-link></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
					<img src="../../images/menu4.png" alt="">
					<div class="mui-media-body">留言反馈</div></a></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
					<img src="../../images/menu5.png" alt="">
					<div class="mui-media-body">视频专区</div></a></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
					<img src="../../images/menu6.png" alt="">
					<div class="mui-media-body">联系我们</div></a></li>
		</ul> 
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/Swiper.vue"
export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getlunbo").then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message;
        } else {
          Toast("加载轮播图失败");
        }
      });
    }
  },
  created() {
    this.getLunbotu();
	},
	components:{
		swiper
	}
};
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-6{
	background-color: #fff;
	border:none;
}
.mui-grid-view.mui-grid-6 .mui-media{
	border: 0;
	img{
		width: 60px;
	}
	.mui-media-body{
		font-size: 12px;
	}
}
</style>
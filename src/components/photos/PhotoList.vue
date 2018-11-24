<template>
	<div>
		<!-- 顶部滑动条 -->
		<div id="slider" class="mui-slider3">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @tap="getPics(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
		</div>
		<!-- 顶部滑动条end -->
		<!-- 图片列表区域start -->
		<ul class="picsList">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<h2 class="info-title">{{item.title}}</h2>
					<p class="info-content">{{item.zhaiyao}}</p>
				</div>
			</router-link>
		</ul>
		<!-- 图片列表区域end-->

	</div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui'

	export default { 
		data(){
			return{
				cates:[],  //所有分类
				list:[],  // 图片列表
			}
		},
		methods:{
			getAllCategory(){
				this.$http.get('api/getimgcategory').then(result=>{
					if(result.body.status===0){
						result.body.message.unshift({title:'全部',id:0});
						this.cates=result.body.message;
					}else{
						Toast("获取图片失败")
					}
				})
			},
			getPics(cateId){
				this.$http.get("api/getimages/"+cateId).then(result=>{
					if(result.body.status===0){
						this.list = result.body.message;
					}else{
						Toast("获取图片列表失败")
					}
				})
			}
		},
		created(){
			this.getAllCategory();
			this.getPics(0)
		},
		mounted(){
			mui(".mui-scroll-wrapper").scroll({
				deceleration:0.0005
			})
		}
	}
</script>
<style lang="scss" scoped>
*{
	touch-action:pan-y;
}

.picsList{
	list-style:none;
	padding: 0;
	margin: 0;
	padding: 5px;
	padding-bottom: 0;
	li{
		position:relative;
		text-align: center;
		background-color:#ccc;
		margin-bottom:10px;
		box-shadow: 0 0 10px #999;
		img{
			width: 100%;
			display:block;
		}
		img[lazy=loading] {
			width: 40px;
			height: 300px;
			margin: auto;
		}
		.info{
			position:absolute;
			bottom: 0;
			color:#fff;
			background-color: rgba(0,0,0,0.4);
			max-height:84px;
			.info-title{
				font-size: 14px;
				text-align: left;
			}
			.info-content{
				font-size:12px;
				text-align: left;
				color:#fff;
				margin: 0;
			}
		}
	}
}
</style>
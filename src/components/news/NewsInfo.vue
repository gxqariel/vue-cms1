<template>
	<div class="newsInfo-container">
		<h3 class="title">{{newsInfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间：{{newsInfo.add_time|dateFormat}}</span>
			<span>点击：{{newsInfo.click}}次</span>
		</p>
		<hr/>
		<div class="content" v-html='newsInfo.content'></div>

		<!-- 评论区子组件 -->
		<comment :id="id"></comment>
		<!-- 评论区子组件 -->

	</div>
</template>
<script>
import {Toast} from "mint-ui"
import comment from '../subcomponents/comment.vue'
	export default {
		data(){
			return{
				id:this.$route.params.id,
				newsInfo:{}
			}
		},
		methods:{
			getNewsInfo(){
				this.$http.get("api/getnew/"+this.id).then(result=>{
					if(result.body.status===0){
						this.newsInfo = result.body.message[0];
						console.log(result.body);
					}else{
						Toast("获取新闻详情失败")
					}
				})
			}
		},
		created(){
			this.getNewsInfo()
		},
		components:{
			comment
		}
	}
</script>
<style lang="scss" scoped>
	.newsInfo-container{
		padding: 0 4px;
		.title{
			font-size: 16px;
			text-align: center;
			padding: 10px;
			color: #333;
		}
		.subtitle{
			padding: 5px;
			font-size:12px;
			color: #aaa;
			display: flex;
			justify-content: space-between;
		}
		
	}
</style>
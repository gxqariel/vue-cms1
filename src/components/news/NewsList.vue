<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<h1 class="mui-media-body">
						{{item.title}}
						<p class='mui-ellipsis'>
							<span>发表时间：{{item.add_time | dateFormat("YYYY-MM-DD HH:mm:ss")}}</span>
							<span>点击：{{item.click}}次</span>
						</p>
					</h1>
				</router-link>
			</li>

		</ul>
	</div>
</template>
<script>
import {Toast} from "mint-ui"
	export default{
		data(){
			return{
				newsList:[]
			}
		},
		methods:{
			getNewsList(){
				this.$http.get("api/getnewslist").then(result=>{
					console.log(result);
					if(result.body.status===0){
						this.newsList = result.body.message;
						// console.log(result.body.message);
					}else{
						Toast("获取新闻列表失败")
					}
				})
			}
		},
		created(){
			this.getNewsList()
		}
	}
</script>
<style lang="scss" scoped>
	.mui-table-view{
		li{
			h1{
				font-size: 14px;
				line-height: 1.5em;
				.mui-ellipsis{
					font-size:12px;
					color: #226aff;
					display:flex;
					justify-content:space-between;
				}
			}
		}
	}
</style>

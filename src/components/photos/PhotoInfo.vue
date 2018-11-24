<template>
	<div class="photoInfo-container">
		<h3>{{photoInfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间：{{photoInfo.add_time | dateFormat}}</span>
			<span>点击：{{photoInfo.click}}次</span>
		
		</p>
		<hr>
		<!-- 缩略图区域 -->
		<vue-preview :slides="list" @close="handleClose" class="thumbs"></vue-preview>
		<!-- 图片内容区域 -->
		<div class="content" v-html="photoInfo.content"></div>

		<!-- 评论子组件 -->
		<comment :id=id></comment> 
	</div>
</template>

<script>
import comment from "../subcomponents/comment.vue"
	export default {
		data(){
			return{
				id:this.$route.params.id, // 图片id
				photoInfo:{},
				list:[],
			}
		},
		methods:{
			getPhotoInfo(){
				this.$http.get("api/getimageInfo/"+this.id).then(result=>{
					if(result.body.status===0){
						this.photoInfo = result.body.message[0]
					}
				})
			},
			getThumbs(){
				this.$http.get('api/getthumimages/'+this.id).then(result=>{
					// console.log(result.status.message);
					if(result.body.status === 0){
						result.body.message.forEach(item=>{
							item.w= 600;
							item.h= 400;
							item.msrc = item.src;
						})
						this.list = result.body.message;
					}
				})
			},
			handleClose(){
				console.log('close Event');
			}
		},
		created(){
			this.getPhotoInfo();
			this.getThumbs();
		},
		components:{
			comment
		}
	}
</script>
<style lang="scss">
	.photoInfo-container{
		padding: 3px;
		h3{
			color:#26a2ff;
			font-size: 15px;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle{
			display:flex;
			justify-content:space-between;
		}
		.content{
			font-size: 12px;
			line-height:2em;
		}
		.thumbs{
			figure{
				margin: 0;
				display: inline-block;
				width: 33%;
				text-align: center;
				img{
					width: 100px!important;
					padding: 5px;
				}
			}

		}
	}
	
</style>
<template>
	<div class="shaopcarContainer">
		<!-- 商品列表区 -->
		<div class="mui-card goods-list" v-for="(item,i) in goodsList" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<mt-switch></mt-switch>
					<img src="item.thumb_path" alt="">
					<div class="info">
						 <h3>{{item.title}}</h3>
						 <p>
							 <span class="price">￥{{item.sell_price}}</span>
							 <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
								 <!-- item.id用于删除$store中的数据，i用来删除本页面goodsList中的数据 -->
							 <a href="#" @click.prevent="remove(item.id,i)">删除</a>
						 </p>
					</div>
				</div>
			</div>
		</div>
		<!-- 商品结算区 -->
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
			</div>
	</div>
</template>

<script>
	import numbox from '../subcomponents/shopcar_numbox.vue'
	export default {
		data(){
			return{
				goodsList:[]  // 购物车中所有商品的数据
			}
		},
		methods:{
			// 根据$store.state.car中的商品信息将商品id存于idArr，发送ajax
			getAllGoods(){
				var idArr = [];  // 存储商品id的数组
				this.$store.state.car.forEach(item=>idArr.push(item.id));
				if(idArr.length<=0)return;
		
				this.$http.get("api/goods/getshopcarlist/"+idArr.join(',')).then(result=>{
					if(result.body.status===0){
						this.goodsList = result.body.message;
					}
				})
			},
			remove(id,index){
				// 点击删除
			}
		},
		components:{
			numbox
		},
		created(){
			this.getAllGoods();
		}
	}
</script>

<style lang="less">
	.shaopcarContainer{
		background-color: #eee;
		overflow: hidden;
		.goods-list{
			.mui-card-content-inner{
				display:flex;	
				img{
					width:60px;
					height:60px;
				}
				.info{
					flex:1;
					display:flex;
					flex-direction:column;
					justify-content:space-between;
					p{
						margin: 0;
						display:flex;
						justify-content:space-between;
					}
					.price{
						color:red;
					}
					h3{
						font-size:13px;
					}
				}
			}
		
		}
	}
</style>
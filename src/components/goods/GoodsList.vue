<template>
	<div class="goods-list">
		<div @click="goDetail(item.id)" class="goods-item" v-for="item in goodsList" :key="item.id">
			<img :src="item.img_url" alt="">
			<h3 class="title">{{item.title}}</h3>
			<div class="info">
				<p class="price">
					<span class="now">￥{{item.sell_price}}</span>
					<span class="old">￥{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>

		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>
<script>
import {Toast} from "mint-ui"
	export default{
		data(){
			return{
				pageIndex: 1,
				goodsList:[]
			}
		},
		methods:{
			getGoodsList(){
				this.$http.get("api/getgoods?pageindex="+this.pageIndex).then(result=>{
					if(result.body.status === 0){
						this.goodsList= this.goodsList.concat(result.body.message);
					
					}else{
						Toast("获取商品信息失败")
					}
				})
			},
			getMore(){
				this.pageIndex++;
				this.getGoodsList()
			},
			goDetail(id){
				// Vue.$router是一个路由导航对象
				// Vue.$route是一个路由参数对象
				// this.$router.push("/home/goodsinfo/"+id)
				// this.$router.push({path:"/home/goodsinfo/"+id})
				// this.$router.push({path:'/home/goodsInfo',query:{id}}) 
				this.$router.push({name:"goodsInfo",params:{id}})  // params和path不能同用
			}
		},
		created(){
			this.getGoodsList();
		}
	}
</script>
<style lang="scss" scoped>
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 10px;
		justify-content: space-between;  // 两端对齐
		.goods-item{
			display: flex;
			flex-direction: column;
			justify-content:space-between;
			width: 49%;
			margin-bottom: 10px;
			border: 1px solid #ccc;
			box-shadow:0 0 8px #ccc;
			min-height: 293px;
			h3.title{
				font-size: 14px;
			}
			img{
				width:100%;
			}
			.info{
				
				padding: 5px;
				background-color: #eee;
				p{
					margin: 0;
				}
				.price{
					.now{
						color:red;
						font-weight:700;
						font-size:16px;
					}
					.old{
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.sell{
					display:flex;
					font-size: 8px;
					justify-content:space-between;
				}
			}
		}
	}
</style>
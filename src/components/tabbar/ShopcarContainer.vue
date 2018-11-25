<template>
	<div class="shaopcarContainer">
		<!-- 商品列表区 -->
		<div class="mui-card goods-list" v-for="(item,i) in goodsList" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"   @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
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
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
						<p>总计（不含运费）</p>
						<p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
					</div>
					<mt-button type="danger">去结算</mt-button>
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
			// 点击删除
			remove(id,index){
				this.goodsList.splice(index,1);
				this.$store.commit("removeFormCar",id)
			},
			// 点击开关，把最新的状态存入store
			selectedChanged(id,val){
				this.$store.commit("updateGoodsSelected",{id,selected:val})
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
		.jiesuan{
			display:flex;
			justify-content: space-between;
			align-items: center;
			.red{
				color: red;
				font-weight: 700;
			}
		}
	}
</style>
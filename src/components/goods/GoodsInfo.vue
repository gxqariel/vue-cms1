<template>
	<div class="goodsInfo-container">
		<!-- 轮播图 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
				</div>
			</div>
		</div>

		<!-- 小球 -->
		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter"
			@after-leave="afterLeave"
			>
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>

		<!--  商品购买区域  -->
		<div class="mui-card">
			<div class="mui-card-header">{{goodsInfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsInfo.sell_price}}</span>
					</p>
					<div class="shop-wrap">
						<p>购物数量：<numbox @getcount="getSelectedCount" :max=goodsInfo.stock_quantity></numbox> </p>
					</div>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addToShopcar" :disabled="btnFlag">加入购物车</mt-button>
						</p>
				</div>
			</div>
		
		</div>
		<!-- 商品参数 -->
		<div class="mui-card">
			<div class="mui-card-header">{{goodsInfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{goodsInfo.goods_no}}</p>
					<p>库存情况：{{goodsInfo.stock_quantity}}</p>
					<p>上线时间：{{goodsInfo.add_time | dateFormat}}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template> 
<script>
	import {Toast} from "mint-ui"
	import swiper from "../subcomponents/Swiper.vue"
	import numbox from "../subcomponents/goodsinfo_numberbox.vue"
	export default {
		data(){
			return{
				id:this.$route.params.id ,// 路由参数对象中的id
				lunbotuList:[],
				goodsInfo:[],
				ballFlag: false,
				btnFlag:false,
				selectedCount:1
			}
		},
		methods:{
			getLunbo(){
				this.$http.get("api/getthumimages/"+this.id).then(result=>{
					if(result.body.status===0){
						result.body.message.forEach(item=>{
							item.img=item.src;
						})
						this.lunbotuList = result.body.message;
					}else{
						Toast("获取轮播图失败")
					}
				})
			},
			getGoodsInfo(){
				this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
					if(result.body.status===0){
						this.goodsInfo = result.body.message[0];
					}
				})
			},
			goDesc(id){
				// 点击使用编程式导航跳转到图文介绍页面
				this.$router.push({name:"goodsdesc",params:{id}})
			},
			goComment(id){
				this.$router.push({name:"goodscomment",params:{id}})
			},
			addToShopcar(){
				this.ballFlag = !this.ballFlag;
				this.btnFlag = true;
			},
			beforeEnter(el){
				el.style.transform="translate(0,0)";
				this.ballFlag = !this.ballFlag;
			},
			enter(el,done){
				el.offsetWidth;
				// 获取元素在页面中的位置 js原生方法 getBooundingClientRect()
				const ballPosition = this.$refs.ball.getBoundingClientRect();
				const badgePosition = document.getElementById("badge").getBoundingClientRect();
				const xDist = badgePosition.left - ballPosition.left;
				const yDist = badgePosition.top - ballPosition.top;
				el.style.transform = `translate(${xDist}px,${yDist}px)`;
				el.style.transition = "all 0.3s cubic-bezier(0,.35,.31,.98)";
				done();
			},
			afterEnter(el){
				this.ballFLag = !this.ballFlag;
			},
			afterLeave(el){
				this.btnFlag = false;
			},
			getSelectedCount(count){
				this.selectedCount = count;
				console.log("父组件"+count);
			}
		},
		components:{
			swiper,
			numbox
		},
		created(){
			this.getLunbo();
			this.getGoodsInfo();
		},
	
	}
</script>
<style lang="scss" scoped>
	.goodsInfo-container{
		background-color:#eee;
		overflow: hidden;
		.now_price{
			color: red;
			font-weight: bold;
		}
		.mui-card-footer{
			display:block;
			button{
				margin: 15px 0;
			}
		}
		.ball{
			width:15px;
			height: 15px;
			border-radius:50%;
			background-color: red;
			top:413px;
			left:175px;
			position:absolute;
			z-index:99;
		}
	}
</style>
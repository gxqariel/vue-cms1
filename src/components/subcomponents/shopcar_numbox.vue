<template>
	<div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="count" @change="countchange" ref="numbox" readonly/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js"
	export default {
		data(){
			return{
				count : this.initcount
			}
		},
		props:["initcount","goodsid"],
		methods:{
			countchange(){
				// 每当购物城中的商品数量发生变化，就将对应的商品的id和数量提交到$store
				this.$store.commit("updateGoodsInfo",{
					id:this.goodsid,
					count:this.$refs.numbox.value
				})
			}
		},
		updated(){
			mui('.mui-numbox').numbox()
		},
		mounted(){
			mui('.mui-numbox').numbox()
		},
	}
</script>
<style lang="scss" scoped>
	.mui-numbox{
		height:25px;
	}
</style>
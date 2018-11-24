<template>
	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countchange" ref="numbox"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js"
	export default {
		props:["max"],
		methods:{
			countchange(){
				// 每当文本框数值变化，将数据传递给父组件
				this.$emit("getcount",parseInt(this.$refs.numbox.value))
			}
		},
		updated(){
			mui('.mui-numbox').numbox()
		},
		mounted(){
			mui('.mui-numbox').numbox()
		},
		watch:{
		 	// 属性监听
			"max":function(newVal,oldVal){
				// mui numbox 使用js api 设置numbox最大值
				mui('.mui-numbox').numbox().setOption('max',newVal);
			}
		}
	}
</script>
<style lang="scss" scoped>
	
</style>
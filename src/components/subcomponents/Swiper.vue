<template>
	<div>
		<!-- lunbotuList由父组件向子组件传递 -->
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in lunbotuList" :key="item.img">
				<img :src="item.img" alt="" :class="{'full':isfull}">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default {
		props:["lunbotuList","isfull"],

	}
</script>
<style lang="scss">
	.mint-swipe {
  height: 200px;
  .mint-swipe-item {
		text-align: center;
  }
  img {
    // width: 100%;
    height: 100%;
  }
}
.full{
	width: 100%;
}
</style>
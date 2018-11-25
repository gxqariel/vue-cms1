import Vue from "vue"

// vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = "http://www.lovegf.cn:8899"
Vue.http.options.emulateJSON = true
// moment时间插件
import moment from "moment"
// 引入mui
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
// 引入mint-ui组件库
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// 按需导入mint-ui组件库
// import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

// 引入vue-preview缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 引入路由js文件和入口组件App.vue
import router from './router.js'
import App from "./App.vue"


import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car')|| '[]');
var store = new Vuex.Store({
	state: {
		car// 购物车中商品的数据 {id,count,price,selected}
	}, 
	mutations: {  // this.$state.commit("方法名","参数")
		// 添加到购物车
		addToCar(state,goodsinfo) {
			// 点击加入购物车，把商品信息保存到store中的car上
			// 1.如果购物车中，已经有对应的商品，只需要更新数量
			// 2. 如果没有，则直接吧商品数据，push到car中
			var flag = false;
			// some方法，找到就return true然后停止
			state.car.some(item => {
				if (item.id == goodsinfo.id) {
					item.count += parseInt(goodsinfo.count);
					flag = true;
					return true;
				}
			})
			if (!flag) {
				state.car.push(goodsinfo);
			}
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		// 更新购物车商品数量
		updateGoodsInfo(state, goodsinfo) {
			state.car.some(item => {
				if (item.id === goodsinfo.id) {
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		// 购物车删除商品
		removeFormCar(state,id) {
			state.car.some((item,i)=>{
				if (item.id === id) {
					state.car.splice(i,1)
					return true;
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		//更新购物车商品选中状态
		updateGoodsSelected(state, info) {
			state.car.some(item => {
				if (item.id == info.id) {
					item.selected = info.selected
				}
			})
			localStorage.setItem('car', JSON.stringify(state.car));
		}

	},
	getters: { 
		// 计算state.car中购物车的商品总数量存于getters，用于HomeContainer的badge中
		getAllCount(state) {
			var c = 0;
			state.car.forEach(item => {
				c += item.count
			})
			return c;
		},
		// 购物车每件商品的数量以{id：count}的形式存于getters，用于ShopContainer中传给shopcar_numbox组件
		getGoodsCount(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.count
			})
			return o
		},
		// 商品选中状态以{id:selected}形式存于getters
		getGoodsSelected(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.selected
			})
			return o;
		},
		// 商品数量和总价
		getGoodsCountAndAmount(state) {
			var o ={
				count: 0,// 勾选的数量
				amount:0 // 勾选的总价
			}
			state.car.some(item => {
				if(item.selected){
					o.count += item.count;
					o.amount += item.count*item.price
				}
			})
			return o
		}
	}  
})

// 在创建Vue实例前定义全局过滤器
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return moment(dateStr).format(pattern)
})


var vm = new Vue({
	el:"#app",
	data:{},
	methods:{},
	render: createElements => createElements(App),
	router,
	store
    
})


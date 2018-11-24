import Vue from "vue"

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 时间插件
import moment from "moment"

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = "http://www.lovegf.cn:8899"
// Vue.http.options.root = "127.0.0.1:5000"
Vue.http.options.emulateJSON = true

import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

// import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);	

import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
Vue.use(MintUI)

import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// Vue.use(VuePreview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })

 
import router from './router.js'
import App from "./App.vue"

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
	filters: {
		
	}
    
})


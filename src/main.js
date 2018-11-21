import Vue from "vue"

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 时间插件
import moment from "moment"

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = "http://www.lovegf.cn:8899"

import { Header,Swipe, SwipeItem,Button} from 'mint-ui';
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

import router from './router.js'
import App from "./App.vue"

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

var vm = new Vue({
	el:"#app",
	data:{},
	methods:{},
	render: createElements => createElements(App),
	router
    
})

// 定义全局过滤器
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return moment(dateStr).format(pattern)
})
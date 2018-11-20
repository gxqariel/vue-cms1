import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MenberContainer from './components/tabbar/MenberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
var router = new VueRouter({
	routes: [
		{path:'/',redirect:'/home'},
		{path:'/home',component:HomeContainer},
		{path:'/menber',component:MenberContainer},
		{path:'/shopcar',component:ShopcarContainer},
		{path:'/search',component:SearchContainer},
		{path:'/home/newslist',component:NewsList},
		{path:'/home/newsinfo/:id',component:NewsInfo},
	],
	linkActiveClass:'mui-active' //覆盖router-link-active
})
export default router
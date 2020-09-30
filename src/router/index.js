import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import {isLogin} from "common/login.js"

const FindMusic = () => import('../views/findmusic/FindMusic.vue');
const NewMusic = () => import('../views/newmusic/NewMusic.vue');
const NewMv = () => import('../views/newmv/NewMv.vue');
const Recommend = () => import('../views/recommend/Recommend.vue');
const MusicList = () => import('../views/musiclist/MusicList.vue');
const Video = () => import('../views/video/Video.vue');
const Search = () => import('../views/search/Search.vue');
const SearchSongs = () => import('../views/search/children/SearchSongs.vue');
const SearchList = () => import('../views/search/children/SearchList.vue');
const SearchMv = () => import('../views/search/children/SearchMv.vue');
const Login = () => import('../views/login/Login.vue');
const Register = () => import('../views/login/Register.vue');


const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
	{
		path:'',
		redirect:'/findmusic'
	},
  {
		path: '/findmusic',
		name: 'FindMusic',
		component: FindMusic,
		meta:{
			title:"发现音乐"
		}
	},
	{
		path: '/newmusic',
		name: 'NewMusic',
		component: NewMusic,
		meta:{
			title:"最新音乐"
		}
	},
	{
		path: '/newmv',
		name: 'NewMv',
		component: NewMv,
		meta:{
			title:"最新MV"
		}
	},
	{
		path: '/recommend',
		name: 'Recommend',
		component: Recommend,
		meta:{
			title:"推荐歌单"
		}
	},
	{
		path: '/musiclist/:id',
		name: 'MusicList', 
		component: MusicList,
		meta:{
			title:"歌单详情"
		}
	},
	{
		path: '/video/:id',
		name: 'Video', 
		component: Video,
		meta:{
			title:"MV详情"
		}
	},
	{
		path: '/login',
		name: 'Login', 
		component: Login,
		meta:{
			title:"登录"
		}
	},
	{
		path: '/register',
		name: 'Register', 
		component: Register,
		meta:{
			title:"注册"
		}
	},
	{
		path: '/search/:id',
		name: 'Search', 
		component: Search,
		meta:{
			title:"搜索结果"
		},
		children:[
			{
				path:'songs',
				name:'SearchSongs',
				component:SearchSongs,
				meta:{
					title:"搜索结果"
				}
			},
			{
				path:'list',
				name:'SearchList',
				component:SearchList,
				meta:{
					title:"搜索结果"
				}
			},
			{
				path:'mv',
				name:'SearchMv',
				component:SearchMv,
				meta:{
					title:"搜索结果" 
				}
			}
		]
	}
]

const router = new VueRouter({
  routes,
	mode:"history"
})

router.beforeEach((to,from,next) => {
	
	if (to.name === 'Login' && isLogin()){
		next({ 
			name: 'FindMusic',
			replace:true
		})
		document.title = '发现音乐';
		store.commit('setTitle','发现音乐')
	}else{
		next()
		document.title = to.meta.title;
		store.commit('setTitle',to.meta.title)
	} 
	 
})

export default router

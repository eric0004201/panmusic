import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

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
  routes
	//mode:"history"
})

router.beforeEach((to,from,next) => {
	document.title = to.meta.title;
	store.commit('setTitle',to.meta.title)
	next()
})

export default router

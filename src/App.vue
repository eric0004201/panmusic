<template>
  <div id="app">
		<top-bar></top-bar>
		<left-nav-bar v-show="showmt"></left-nav-bar>
		<play></play>
		<play-list></play-list>
		<keep-alive exclude="MusicList,Video,Search">
			<router-view/>
		</keep-alive>
    
  </div>
</template>



<script>
	import TopBar from 'components/content/TopBar/TopBar.vue'
	import LeftNavBar from 'components/content/LeftNavBar/LeftNavBar.vue'
	import Play from 'components/content/Play/Play.vue'
	import PlayList from 'components/content/PlayList/PlayList.vue'
	
	export default {
		name: 'App',
		components: {
			TopBar,
			LeftNavBar,
			Play,
			PlayList
			
		},
		computed:{
			showmt(){
				return !(this.$route.path.indexOf('video')>0)
			}
		}
	}
</script>
<style>
	@import url("~assets/css/reset.css");
</style>

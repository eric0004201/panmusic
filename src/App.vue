<template>
  <div id="app">
		<top-bar></top-bar>
		<div class="main-wrap">
			<left-nav-bar v-show="showmt"></left-nav-bar>
			<div class="ami-wrap">
				<transition>
					<keep-alive exclude="MusicList,Video,Search">
						<router-view/>
					</keep-alive>
				</transition>
			</div>
		</div>
		<play></play>
		<play-list></play-list>
		
    
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
<style scoped="scoped">
	@import url("~assets/css/reset.css");
	.main-wrap{
		position: fixed;
		left: 0;
		right: 0;
		top: 60px;
		bottom: 70px;
		display: flex;
		
	}
	.ami-wrap{
		perspective: 2200px;
		transform-style: preserve-3d;
		flex: 1;
		overflow: hidden;
		position: relative;
	}
	#app .v-enter-active,#app .v-leave-active{
		
		transition: all 0.3s linear;
		transform-origin: center center; 
		left: 0;
		right: 0;
		top: 0px;
		bottom: 0px;
	}
	#app .v-enter-active{
		transition-delay:0.3s ;
	}
	#app .v-leave-active{
		z-index: 2;
	}
	.v-enter{
		opacity: 0;
		transform: rotateY(-90deg);
		
		
	}
	.v-enter-to{
		opacity: 1;
		transform: rotateY(0deg);
	}
	.v-leave{
		
		transform: rotateY(0deg);
	}
	.v-leave-to{
		transform: rotateY(90deg);
		z-index: 1;
	}
	
	@media screen and (max-width: 960px) {
			#app{
				position: absolute;
				height: 100%;
				width: 100%;
				transition: all 1.4s;
				transform: rotate(720deg) scale(0);
				
			}
			body{
				overflow: hidden;
			}
			body::before{
				content: "请把窗口开大点好吗";
				position: absolute;
				width: 100%;
				left: 0;
				top: 100px;
				font-size: 18px;
				text-align: center;
				animation: stip 1.6s ease-out infinite;
			}
			@keyframes stip {
			    0% {   
						
						color: #D33A31;
						letter-spacing:0.3;
			      transform: scale(01) translateY(0px); 
						opacity:0.5;
						filter: blur(5px);
			    }
					25%{
					  color:#D33A31;        
						filter: blur(0);		 
						transform: scale(1.1) translateY(100px); 
						letter-spacing:1;
						opacity:1;
					} 
					60%{
					  color:#e90606;        
						filter: blur(0);		 
						transform: scale(1.1) translateY(100px); 
						letter-spacing:1;
					} 
			    100% {    
						letter-spacing: 13px;
						color: #000;
			      transform:  scale(6.2) translateY(0px); 
						opacity:1;
						
			    }
			}
	} 
</style>

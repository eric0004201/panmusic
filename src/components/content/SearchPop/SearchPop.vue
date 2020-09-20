<template>
	<transition>
		<div class="search-pop" v-show="isShow" :style="{height:popHeight}">
			<div class="search-tit" v-show="getKSongs.length>0"><i class="el-icon-headset"></i><span>单曲</span></div>
			<div class="search-list">
				<div class="search-list-item" v-for="item in getKSongs" @click="play(item)">
					{{item.name}} - {{item.artists[0].name}}
				</div>
			</div>
			<div class="search-tit" v-show="getKList.length>0"><i class="el-icon-headset"></i><span>歌单</span></div>
			<div class="search-list">
				<div class="search-list-item" v-for="item in getKList" @click="toList(item.id)">
					{{item.name}}
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default{
		name:"SearchPop",
		data(){
			return {
				isShow:false,
				popHeight:"300px"
			}
		},
		computed:{
			...mapGetters(['getKSongs','getKList','getKey'])
		},
		mounted() {
			let that = this;
			
			this.$bus.$on('search', ()=> {
				this.isShow = Object.keys(this.getKey).length>0
				
			})
			this.$bus.$on('searchHide', ()=> {
				this.isShow = false;
				
			})
			this.popHeight = window.innerHeight - 130 + "px";
			window.addEventListener('resize', () => {
				this.popHeight = window.innerHeight - 130 + "px";
			}, false);
			document.addEventListener('click',function(e){
				
			    if(e.target.className=='search-pop'||e.target.className=='search-tit'||e.target.className=='search-list-item'||e.target.className=='search-list'||e.target.className=='el-input__inner'||e.target.className=='el-input__icon el-icon-search'){
			     that.isShow = Object.keys(that.getKey).length>0;
			    }else{
						that.isShow=false;
					}
			})
		},
		methods:{
			play(item){
				this.$store.commit('addMusic',item);
				
				this.$bus.$emit("play",item);
				
			},
			toList(id){
				this.isShow = false;
				
				setTimeout(() => {
					this.isShow = false;
				},200)
				this.$router.push('/musiclist/'+id);
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-pop{
		position: absolute;
		right: 0;
		width: 420px;
		top: 60px;
		height: 450px;
		background: #fff;
		z-index: 100;
		overflow: auto;
		box-shadow:0px 0px 1px rgba(0, 0, 0, 0.3);
		padding: 0 10px 10px;
		transform-origin: top center;  
	}
	.search-tit{
		font-size: 16px;
		color: $black2;
		line-height: 42px;
		margin-top: 10px;
		span{
			padding-left: 4px;
		}
	}
	.bgon .search-tit{
		color: $black2;
		span{
			color: $black2;
		}
	}
	.search-list-item{
		line-height: 40px;
		font-size: 14px;
		padding-left: 21px;
		cursor: pointer;
	}
	.bgon .search-list-item{
		color: $black2;
	}
	.search-list-item:hover{
		
		background: $navHoverBg;
	}
	
	.v-enter-active,.v-leave-active{
	  transition: all .5s;
		
	
	}
	.v-leave-active {
	 
	}
	.v-enter,.v-leave-to {
	  transform: rotateX(-90deg);
		opacity: 0;
	}
	.v-enter-to,.v-leave{
		transform: rotateX(0deg);
		opacity: 1;
	}
	
	
	
</style>

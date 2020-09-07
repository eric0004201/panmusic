<template>
	<div class="search-pop" v-show="isShow">
		<div class="search-tit" v-show="getKSongs.length>0"><i class="el-icon-headset"></i><span>单曲</span></div>
		<div class="search-list">
			<div class="search-list-item" v-for="item in getKSongs" @click="play(item)">
				{{item.name}} - {{item.artists[0].name}}
			</div>
		</div>
		<div class="search-tit" v-show="getKList.length>0"><i class="el-icon-headset"></i><span>歌单</span></div>
		<div class="search-list">
			<div class="search-list-item" v-for="item in getKList">
				{{item.name}}
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default{
		name:"SearchPop",
		data(){
			return {
				isShow:false
				
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
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-pop{
		position: fixed;
		right: 0;
		width: 420px;
		top: 60px;
		bottom: 70px;
		background: #fff;
		z-index: 100;
		overflow: auto;
		box-shadow: -2px -1px 4px rgba(0, 0, 0, 0.3);
		padding: 0 10px 10px;
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
	
	.search-list-item{
		line-height: 40px;
		font-size: 14px;
		padding-left: 21px;
		cursor: pointer;
	}
	.search-list-item:hover{
		
		background: $navHoverBg;
	}
</style>

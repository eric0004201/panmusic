<template>
	<div class="top-bar">
		
		<div class="tit">{{getTitle}} 
			<div v-if="showBack" class="back" @click="back()"><i class="el-icon-arrow-left"></i></div>
		</div>
		<div class="search" @click="showPop">
			<el-input
					ref="input"
					size="mini"
			    placeholder="请输入内容"
			    prefix-icon="el-icon-search"
					@input="getValue"
					
					@keyup.enter.native="goValue"
			    v-model.trim ="input">
			  </el-input>
		</div>
		<search-pop ref="spop"></search-pop>
	</div>
</template>

<script>
	import { debounce } from 'common/utils.js'
	import { getSearch } from 'network/find.js'
	import { mapGetters } from 'vuex'
	import SearchPop from 'components/content/SearchPop/SearchPop.vue'
	
	export default{
		name:"TopBar",
		data(){
			return {
				input:"",
				getValue:null
			}
		},
		computed:{
			...mapGetters(['getTitle']),
			showBack(){
				return this.$route.path.indexOf('video') >0
			}
		},
		components:{
			SearchPop
		},
		methods:{
			getKey(){
				if(this.input == '') {
					this.$store.commit("addToKey",{});
					this.$bus.$emit("search");
					return;
				};
				
				getSearch(this.input).then(res => {
					
					let obj = {}
					let songs = res.result.songs;
					let list = res.result.playlists;
					if(songs !== undefined){
						obj.song = songs;
					}
					if(list !== undefined){
						obj.list = list;
					}
					this.$store.commit("addToKey",obj);
					this.$bus.$emit("search");
				})
			},
			goValue(){
				this.$refs.spop.isShow = false;
				this.$refs.input.blur()
				this.$router.push('/search/'+this.input + '/songs')
			},
			showPop(){
				this.$bus.$emit("search");
			},
			back(){
				this.$router.go(-1)
			}
		},
		mounted() {
			let getK=debounce(this.getKey,350);
			this.getValue = () => {
				getK()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-bar{
		
		height: 60px;
		
		background: $bgTop;
	}
	.tit{
		position: relative;
		text-align: center;
		color: $black1;
		font-size: $fs18;
		line-height: 60px;
		width: 1200px;
		margin: 0 auto;
		
		
	}
	.search{
		position: absolute;
		right: 30px;
		width: 200px;
		height: 28px;
		top: 18px;
	}
	.search ::v-deep .el-input--mini .el-input__icon{
		line-height: 30px;
	}
	.back{
		position: absolute;
		left: 0;
		top: 15px;
		line-height: 30px;
		font-size: 16px;
		width: 30px;
		border-radius: 50%;
		cursor: pointer;
		
		font-size: 22px;
	}
	.back:hover{
		background: #eee;
	}
</style>

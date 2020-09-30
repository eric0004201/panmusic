<template>
	<div class="top-bar">
		<a v-show="isMV" class="git" href="https://github.com/eric0004201/panmusic" target="_blank"><img src="~assets/images/git.png"/></a>
		<user></user>
		<div v-if="isLogin" class="out" @click="loginOut">
			<el-button size="mini" type="warning">退出登录</el-button>
		</div>
		<div class="tit amt">
			<div class="ttit amt" :class="{aniwd:isa}" v-html="getT"></div>
			<div v-if="showBack" class="back" @click="back()"><i class="el-icon-arrow-left"></i></div>
		</div>
		<div class="search" @click="showPop">
			<el-input
					ref="input"
					size="mini"
			    placeholder="请输入内容"
			    prefix-icon="el-icon-search"
					@input="getValue"
					maxlength = "37"
					@keyup.enter.native="goValue"
			    v-model.trim ="input">
			  </el-input>
		</div>
		<search-pop ref="spop"></search-pop>
	</div>
</template>

<script>
	import { debounce, getLogin, setUser,getUser } from 'common/utils.js'
	import { getSearch } from 'network/find.js'
	import { mapGetters } from 'vuex'
	import SearchPop from 'components/content/SearchPop/SearchPop.vue'
	import User from 'components/content/User/User.vue'
	import { isLogin, loginOut } from 'common/login.js'
	
	export default{
		name:"TopBar",
		data(){
			return {
				input:"",
				getValue:null,
				bgon:false,
				isa:false,
				isLogin:isLogin(),
				isMV:true
			}
		},
		
		computed:{
			...mapGetters(['getTitle']),
			getT(){
				let arr = this.getTitle.split("");
				let str="";
				arr.forEach((item, index) => {
					str+= '<span>' + item + '</span>'
				})
				setTimeout(()=>{
					this.isa = true
				},500)
				return str;
			},
			showBack(){
				return this.$route.path.indexOf('video') >0
			}
		},
		components:{
			SearchPop,
			User
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
				let str= this.input.replace(/[\-\_\,\/\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '');
				this.input = str;
				if(!str) {
					this.$message({
						message: '请不要输入特殊字符！',
						type: 'warning'
					});
					this.input = "";
					return
				}
				this.$router.push('/search/'+str + '/songs')
			},
			showPop(){
				this.$bus.$emit("search");
			},
			back(){
				this.$router.go(-1)
			},
			loginOut(){
				loginOut();
				this.isLogin = false;
				setUser("用户")
				setTimeout(()=>{
					this.$bus.$emit("logOut")
				},200)
				
				
				
			}
		},
		watch:{
			'$route' (from,to){
				setTimeout(()=>{
					if(this.$route.path.indexOf('video')>0){
						this.isMV = false;
					}else{
						this.isMV = true;
					}
				},200)
			}
		},
		mounted() {
			
			let getK=debounce(this.getKey,350);
			this.getValue = () => {
				getK()
			}
			this.$bus.$on("play",() => {
				this.bgon = true;
			})
			this.$bus.$on("goplay",() => {
				this.bgon = true;
			})
			this.$bus.$on("login",()=>{
				this.name = getUser();
				this.isLogin = true
			})
			this.$bus.$on("pause",() => {
				this.bgon = false;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.top-bar{
		height: 60px;
		background: $bgTop;
		perspective: 500px;
		
		position: relative;
		z-index: 2;
		perspective-origin: right;
	}
	.bgon .top-bar{
		background:none;
	}
	.tit{
		position: relative;
		text-align: center;
		color: $black1;
		font-size: 22px;
		line-height: 60px;
		text-align: center;
		overflow: hidden;
		box-shadow: 0 5px 35px -1px rgba(0,0,0,.1);
	}
	.ttit{
		opacity: 0;
	}
	.ttit.aniwd{
		opacity: 1;
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
		left: 20px;
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
	.git{
		position: absolute;
		left: 15px;
		top: 4px;
		z-index: 2;
	}
	.out{
		position: absolute;
		left: 273px;
		top: 17px;
		width: 30px;
		z-index: 2;
	}
</style>

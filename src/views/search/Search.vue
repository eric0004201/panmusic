<template>
	<div class="main" ref="main">
		<div class="head">
			<span class="key">{{keyWord}}</span>
			<span class="tips">找到{{tot}}个结果</span>
		</div>
		<div class="list-tit">
			<div :class="{on : n===cur}" v-for="(i,n) in types" @click="typeClick(n,$event)">
				{{i}}
			</div>
			
		</div>
		
		<router-view></router-view>
		
	</div>
</template>

<script>
	export default{
		name:"Search",
		data(){
			return {
				tot:0,
				keyWord:'',
				cur:0,
				types:["歌曲","歌单","MV"],
				type:'歌曲'
			}
		},
		created() {
			this.keyWord = this.$route.params.id
			
		},
		mounted() {
			this.$bus.$on("gotop",() =>{
				this.$refs.main.scrollTop = 0;
			});
			if(this.$route.path.indexOf("list")>0){
				this.cur = 1;
			}
			if(this.$route.path.indexOf("mv")>0){
				this.cur = 2;
			}
			this.$bus.$emit("searchHide");
			this.$bus.$on("all",(n) =>{
				this.tot = n;
				
			})
			
		},
		methods:{
			typeClick(n,e){
				this.cur = n;
				let t;
				this.type = e.target.innerHTML.replace(/\s*/g,'');
				
				switch(this.type){
					case "歌曲" :
						t = '/songs';
						break;
					case '歌单' :
						t = '/list';
						
						break;
					case 'MV' :
						t = '/mv';
						break;
				}
				
				this.$router.push('/search/'+this.keyWord + t)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/style.scss";
	
	.head{
		padding: 23px 40px;
		.key{
			font-weight: bold;
			font-size: 24px;
			padding-right: 4px;
		}
		.tips{
			color: $black3;
			font-size: 15px;
		}
	}
	.list-tit{
		display: flex;
		padding-left: 40px;
		font-size: 18px;
		color: $black2;
		line-height: 48px;
		border-bottom: 1px solid #eee;
		div{
			cursor: pointer;
			margin-right: 30px;
		}
	}
	.list-tit div:hover{
		color: $black1;
	}
	.list-tit div.on{
		color: $black1;
	}
	
	.bgon .tips{
		color: #3a3838;
		font-size: 15px;
	}
</style>

<template>
	<div class="user" @mouseenter="gets">
		<div class="tit amt">
			<i class="el-icon-user"></i>
			<span v-text="name"></span>
		</div>
		<div class="user-sheet amt" :class="{off:isoff}">
			<div v-show="getSheet.length < 5" class="news" @click="plusSheet"><i class="el-icon-plus"></i></div>
			<div class="utit">我的歌单(本地最多5个)</div>
			<div v-if="getSheet.length===0" class="news-tip">还没有歌单哦，你可以新建一个</div>
			<div class="user-con">
				<div @click="playSheet(item.name)" class="user-item" v-for="(item,index) in getSheet" :key="index">
					{{item.name}} ({{item.list.length}})
					<span @click.stop="removeSheet(item.name)" class="del"><i class="el-icon-delete"></i></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getUser, setUser, setMySheet, getMySheet, removeMySheet, getMySheetItem } from 'common/utils.js'
	import { plusSt } from 'common/mixin.js'
	
	export default{
		name:"User",
		data(){
			return {
				name:getUser(),
				getSheet:getMySheet(),
				isoff:false
			}
		},
		mounted() {
			if(getUser() === null){
				
				this.$prompt('', '你叫什么', {
					showClose:false,
					inputPattern:/^.{1,6}$/,
					inputErrorMessage: '名字长度只能在1-6位',
					showCancelButton:false,
					closeOnClickModal:false,
					confirmButtonText: '确定'
				}).then(({ value }) => {
					setUser(value);
					this.name = getUser()
				});
			}
		},
		mixins:[plusSt],
		methods:{
			gets(){
				this.getSheet = getMySheet()
			},
			removeSheet(n){
				removeMySheet(n);
				this.getSheet = getMySheet();
				
			},
			playSheet(name){
				let list = getMySheetItem(name);
				
				if(list.length === 0){
					this.$alert(`亲爱的${this.name},你还没有添加歌曲呢,先找首喜欢的歌吧`).catch(() =>{})
					return;
				} 
				this.$store.commit('addMusicList',list);
				this.$bus.$emit("play",list[0],2);
				
				this.$bus.$emit("collectClick");
				this.$bus.$emit("curname",name);
				this.isoff = true;
				setTimeout(() =>{
					this.isoff = false;
				},400)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user{
		position: absolute;
		left: 110px;
		height: 60px;
		top: 0;
		z-index: 2;
		perspective: 500px;
	}
	.tit{
		line-height: 60px;
		font-size: 24px;
		width: 100px;
		
		color: #333333;
		cursor: pointer;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		span{
			font-size: 15px;
			line-height: 60px;
			vertical-align: middle;
			margin-left: 5px;
			white-space: nowrap;
		}
		&:hover {
			color: red;
		}
	}
	
	.bgon .tit:hover span{
		color: red;
	}
	.user-sheet{
		position: absolute;
		left: -110px;
		top: 60px;
		width: 300px;
		overflow: auto;
		height: calc(100vh - 60px);
		background: #fff;
		box-shadow: 0 7px 10px rgba(0,0,0,0.3);
		opacity: 0;
		transform: rotateY(-90deg);
		transform-origin: left center;
	}
	.user:hover .user-sheet{
		opacity: 1;
		transform: rotateY(0deg);
	}
	.utit{
		line-height: 30px;
		font-size: 15px;
		color: $black1;
		padding: 10px;
		margin-top: 10px;
	} 
	.bgon .utit{
		color: $black1;
	}
	.user-con{
		font-size: 14px;
		
		color: $black2;
		line-height: 30px;
		
		div{
			@include txt-over;
			cursor: pointer;
			padding: 0 20px;
			&:hover{
				background: #F3EDED;
			}
		}
		.user-item{
			background: #faf9f9;
			margin-bottom: 1px;
			position: relative;
		}
	}
	.bgon .user-item{
		color: $black2;
	}
	.news{
		font-size: 20px;
		position: absolute;
		right: 10px;
		top: 22px;
		cursor: pointer;
	}
	.news-tip,.bgon .news-tip{
		padding: 20px;
		font-size: 13px;
		color: $black2;
	}
	.bgon .news{
		color: $black2;
	}
	.user-con{
		position: absolute;
		top: 60px;
		bottom: 70px;
		left: 0;
		right: 0;
		overflow: auto;
	}
	.del{
		position: absolute;
		font-size: 20px;
		right: 10px;
		top: 0;
		color: #555;
		display: none;
		
	}
	.user-item:hover .del{
		display: block;
	}
	.bgon .del{
		color: #555;
	}
	.user .user-sheet.off{
		
		transform: translateX(-300px);
	}
</style>

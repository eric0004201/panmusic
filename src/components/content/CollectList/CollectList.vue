<template>
	<div class="clist" @mouseenter="gets">
		<div class="animate__animated animate__heartBeat cicon"><i class="el-icon-circle-plus-outline"></i></div>
		<div class="clist-con amt" v-show="ishow" >
			<div class="tit">添加到哪个歌单呢?</div>
			<div v-show="getSheet.length===0" @click="plusSheet" class="ctip">还没有歌单哦，马上新建一个</div>
			<div @click="itemClick(item.name)" class="user-item" v-for="(item,index) in getSheet" :key="index">{{item.name}}</div>
		</div>
	</div>
</template>

<script>
	import {setMySheet, getMySheet, getMySheetItem } from 'common/utils.js'
	import { plusSt } from 'common/mixin.js'
	export default{
		name:"CollectList",
		data(){
			return {
				getSheet:getMySheet(),
				ishow:true
			}
		},
		mixins:[plusSt],
		methods:{
			itemClick(name){
				this.ishow = false;
				setTimeout(()=>{
					this.ishow = true;
				},20)
				this.$emit("collectList",name)
			},
			gets(){
				this.getSheet = getMySheet()
				
			}
			
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.clist{
		position: relative;
		cursor: pointer;
	}
	.cicon{
		font-size: 30px;
		animation-iteration-count: infinite;
		animation-delay: 4.5s;
	}
	.clist-con,.bgon .clist-con{
		position: absolute;
		left: 30px;
		bottom: 0;
		width: 240px;
		height: 180px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 3px rgba(0,0,0,0.2);
		cursor: default;
		color: $black2;
		z-index: 2;
		opacity: 0;
		transform: translateY(200px);
		
		.tit{
			color: $black2;
			text-align: center;
			padding: 10px;
			font-size: 15px;
		}
		.user-item{
			background: #faf9f9;
			margin-bottom: 1px;
			color: $black2;
			padding: 0 14px;
			position: relative;
			line-height: 26px;
			@include txt-over;
			cursor: pointer;
			font-size: 14px;
			&:hover{
				background: #F3EDED;
			}
		}
		
	}
	.clist:hover .clist-con{
		
		opacity: 1;
		transform: translateY(0px);
	}
	.ctip,.bgon .ctip{
		padding: 15px;
		cursor: pointer;
		color: $black2;
	}
</style>

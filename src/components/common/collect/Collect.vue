<template>
	<div class="animate__animated animate__heartBeat collect " @click="collect">
		<i class="el-icon-star-off" :class="{'el-icon-star-on':ison}"></i>
	</div>
</template>

<script>
	export default{
		name:"Collect",
		data(){
			return {
				ison:false
			}
		},
		methods:{
			collect(){
				this.ison = !this.ison;
				this.$emit("collect",this.ison)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collect{
		font-size: 30px;
		cursor: pointer;
		animation-iteration-count: infinite;
		animation-delay: 4s;
	}
	.el-icon-star-on{
		color: $navActiveColor;
		
	}
</style>

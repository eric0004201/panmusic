<template>
	<div class="collect" @click="collect">
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
		
	}
	.el-icon-star-on{
		color: $navActiveColor;
		
	}
</style>

<template>
	<div class="tag-list">
		<ul>
			<li v-for="(item,index) in tags" 
				  :class="{on : curTag===index}"
					@click="tagClick(index,$event)" 
					:key='index'>
				{{item}}
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"Tags",
		props:{
			tags:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				curTag:0
			}
		},
		methods:{
			tagClick(index,e){
				this.curTag = index;
				let tag = e.target.innerHTML.replace(/\s*/g,'');
				this.$emit('tagClick',tag)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag-list{
		
		height: 50px;
		line-height: 50px;
		ul{
			display: flex;
			justify-content:flex-end;
			
			li{
				margin-left: 12px;
				margin-right: 4px;
				color: $black2;
				cursor: pointer;
				font-size: 15px;
			}
			li:hover{
				color: $black1;
			}
			li.on{
				color: $navActiveColor;
			}
		}
	}
</style>

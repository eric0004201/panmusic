<template>
	<div class="cmm">
		<div v-if="hot.length>0">
			<div class="ctit">精彩评论</div>
			<div class="cwp" v-for="(item,index) in hot"
											:key="index">
				<div class="cimg"><img v-lazy="item.user.avatarUrl+'?param=80y80'" /></div>
				<div class="cinfo" >
					<div class="cwd-wp">
						<div class="cwd1">
							<span>{{item.user.nickname}}:</span>
							<span>{{item.content}}</span>
						</div>
						<div class="cwd2" v-if="item.beReplied.length>0">
							<span>{{item.beReplied[0].user.nickname}}:</span>
							<span>{{item.beReplied[0].content}}</span>
						</div>
					</div>
					<div class="cdate">
						{{cdate(item.time)}}
					</div>
				</div>
			</div>
		</div>
		<div>
			<div id="ctit" class="ctit" v-if="comments.length>0">最新评论<span>({{cnum}})</span></div>
			<div class="cwp" v-for="(item,index) in comments" 
											v-if="comments.length>0"
											:key="index">
				<div class="cimg"><img v-lazy="item.user.avatarUrl+'?param=80y80'" /></div>
				<div class="cinfo" >
					<div class="cwd-wp">
						<div class="cwd1">
							<span>{{item.user.nickname}}:</span>
							<span>{{item.content}}</span>
						</div>
						<div class="cwd2" v-if="item.beReplied.length>0">
							<span>{{item.beReplied[0].user.nickname}}:</span>
							<span>{{item.beReplied[0].content}}</span>
						</div>
					</div>
					<div class="cdate">
						{{cdate(item.time)}}
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import { fenFormat, dateFormat } from 'common/utils.js'
	
	export default{
		name:"Comments",
		computed:{
			cdate(v){
				return function(v){
					var d = new Date(v)
					return dateFormat('YYYY-mm-dd HH:MM:SS',d)
				}
			}
		},
		props:{
			hot:{
				type:Array,
				default(){
					return []
				}
			},
			comments:{
				type:Array,
				default(){
					return []
				}
			},
			cnum:{
				type:Number,
				default(){
					return 0
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.ctit{
		line-height: 50px;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	.ctit span{
		font-size: 16px;
	}
	.cwp{
		display: flex;
	}
	.cimg{
		margin-right: 15px;
	}
	.cimg img{
		width: 50px;
		height: 50px;
		vertical-align: middle;
		border-radius: 50%;
	}
	.cwp{
		
		margin-bottom: 20px;
	}
	.cinfo{
		font-size: 14px;
		flex: 1;
		padding-bottom: 20px;
		border-bottom: 1px solid #eee;
		.cwd1 span:first-child{
			color: #0074D9;
			padding-right: 3px;
		}
		.cwd1{
			
		}
		.cwd2{
			background: #eee;
			padding: 8px;
			border-radius: 5px;
			margin-top: 10px;
		}
		.cwd2 span:first-child{
			color: #0074D9;
			padding-right: 3px;
		}
		.cdate{
			padding-top: 10px;
			color: $black2;
		}
	}
</style>

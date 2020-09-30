<template>
	<div class="up amt" :class="{on:ison}" @click="go">
		<i class="el-icon-caret-top"></i>
	</div>
</template>

<script>
	import {throttle} from 'common/utils.js';
	const cubic = value => Math.pow(value, 3);
	const easeInOutCubic = value => value < 0.5
	  ? cubic(value * 2) / 2
	  : 1 - cubic((1 - value) * 2) / 2;
		
	export default{
		name:"ToTop",
		data(){
			return {
				el:null,
				ison:false,
				top:0
			}
		},
		watch:{
			'$route'(from,to){
				this.ison = false
			
			}
		},
		mounted() {
			let scroll = throttle(this.fnScroll,300)
			//
			setTimeout(()=>{
				
				document.addEventListener('mousewheel', scroll);
			},400)
				
			
		},
		
		methods:{
			go(){
				this.scrollToTop()
			},
			
			fnScroll(){
				this.el = document.querySelector('.main');
				this.top = this.el.scrollTop;
			
				if(this.top>300){
					this.ison = true
				}else{
					this.ison = false
				}
				
			},
			scrollToTop() {
				const el = this.el;
				const beginTime = Date.now();
				const beginValue = el.scrollTop;
				const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
				const frameFunc = () => {
					const progress = (Date.now() - beginTime) / 500;
					if (progress < 1) {
						el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
						rAF(frameFunc);
					} else {
						el.scrollTop = 0;
						this.ison = false
					}
				};
				rAF(frameFunc);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.up{
		
		position: fixed;
		cursor: pointer;
		right: 30px;
		bottom: 140px;
		font-size: 30px;
		background: #F1EFEE;
		border-radius: 50%;
		color: #d16161;
		width: 44px;
		height: 44px;
		line-height: 42px;
		text-align: center;
		vertical-align: middle;
		transform: translateY(300px);
	}
	.bgon .up{
		color: #d16161;
	}
	.up:hover{
		background: #dae3ff;
	}
	.up.on{
		transform: translateY(0);
	}
</style>

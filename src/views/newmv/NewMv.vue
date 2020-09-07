<template>
	<div class="main" ref="main">
		<div class="main-in">
			<div class="ch-list">
				<div>地区：</div>
				<div class="ch-item" 
						:class="{on : index===cur1}"
						@click="clickTag(index,'cur1',$event)"
						v-for="(item,index) in areas">
					{{item}}
				</div>
			</div>
			<div class="ch-list">
				<div>类型：</div>
				<div class="ch-item" 
						:class="{on : index===cur2}"
						@click="clickTag(index,'cur2',$event)"
						v-for="(item,index) in types">
					{{item}}
				</div>
			</div>
			<div class="ch-list">
				<div>排序：</div>
				<div class="ch-item" 
						:class="{on : index===cur3}" 
						@click="clickTag(index,'cur3',$event)"
						v-for="(item,index) in sorts">
					{{item}}
				</div>
			</div>
			<mv-list :mv-list="mvList"></mv-list>
			<pagination ref='page' :pageSize='pageSize' :total="cnum" @goPage='goPage'></pagination>
		</div>
	</div>
</template>

<script>
	import MvList from 'components/content/MvList/MvList.vue'
	import Pagination from 'components/content/Pagination/Pagination.vue'
	import { getMvList } from 'network/mv.js'
	
	export default{
		name:"NewMv",
		data(){
			return {
				areas:["全部","内地","港台","欧美","日本","韩国"],
				types:["全部","官方版","原声","现场版","网易出品"],
				sorts:["上升最快","最热","最新"],
				cur1:0,
				cur2:0,
				cur3:0,
				mvList:[],
				pageSize:40,
				page:0,
				area:'全部',
				type:'全部',
				order:'上升最快',
				cnum:0
			}
		},
		components:{
			MvList,
			Pagination
		},
		created() {
			this.getMV()
		},
		methods:{
			clickTag(index,cur,e){
				let tag = e.target.innerHTML.replace(/\s*/g,'');
				this.page = 0;
				this[cur] = index;
				switch(cur){
					case 'cur1' : 
						this.area = tag;
						break;
					case 'cur2' :
						this.type = tag;
						break;
					case 'cur3' :
						this.order = tag;
						break;
				}
				
				this.$refs.page.currentPage = 1;
				this.getMV()
			},
			getMV(){
				let pg = this.pageSize * this.page;
				
				getMvList(this.pageSize, pg, this.area, this.order, this.type).then(res => {
					
					this.mvList = res.data;
					if(res.count){
						this.cnum = res.count;
					}
					
					
				})
			},
			goPage(val){
				this.page = val-1;
				this.getMV();
				this.$refs.main.scrollTop = 0;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/style.scss";
	
	.ch-list{
		display: flex;
		padding-bottom: 24px;
		font-size: 14px;
		div{
			padding: 4px 14px;
			border-radius: 14px;
		}
	}
	.ch-item{
		margin: 0 10px;
		cursor: pointer;
		color: $black2;
		
	}
	.ch-item:hover{
		color: $black1;
	}
	.ch-item.on{
		background: #fdf6f5;
		color: $navActiveColor;
	}
</style>

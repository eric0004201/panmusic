(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-246232da"],{"10f1":function(t,i,a){"use strict";var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"mv-item",on:{click:t.goMV}},[a("img",{staticClass:"img",attrs:{src:t.imagePath}}),a("div",{staticClass:"paly-num"},[a("i",{staticClass:"el-icon-caret-right"}),t._v(t._s(t.obj.playCount))]),a("div",{staticClass:"wd"},[t._v(t._s(t.obj.name))]),a("div",{staticClass:"name"},[t._v(t._s(t.obj.artistName))]),t._m(0)])},n=[function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"icon-hide amt"},[a("i",{staticClass:"el-icon-caret-right"})])}],e=(a("e35a"),a("0d7a"),{name:"MvListItem",props:{obj:{type:Object,default:function(){return{}}}},methods:{goMV:function(){this.$router.push("/video/"+this.obj.id)}},computed:{imagePath:function(){return this.obj.hasOwnProperty("picUrl")?"//"+this.obj.picUrl.split("//")[1]+"?param=320y180":"//"+this.obj.cover.split("//")[1]+"?param=320y180"}}}),c=e,o=(a("b1b9"),a("9ca4")),r=Object(o["a"])(c,s,n,!1,null,"b06d99aa",null);i["a"]=r.exports},1830:function(t,i,a){"use strict";var s=a("293f"),n=a.n(s);n.a},"293f":function(t,i,a){},"2aba":function(t,i,a){},"642f":function(t,i,a){"use strict";a.d(i,"a",(function(){return n})),a.d(i,"b",(function(){return e})),a.d(i,"d",(function(){return c})),a.d(i,"c",(function(){return o})),a.d(i,"e",(function(){return r}));var s=a("1bab");function n(t,i,a,n,e){return Object(s["a"])({url:"/mv/all",params:{limit:t,offset:i,area:a,order:n,type:e}})}function e(t){return Object(s["a"])({url:"/mv/url",params:{id:t}})}function c(t){return Object(s["a"])({url:"/mv/detail",params:{mvid:t}})}function o(t,i,a){return Object(s["a"])({url:"/comment/mv",params:{id:t,pageSize:i,offset:a}})}function r(t){return Object(s["a"])({url:"/simi/mv",params:{mvid:t}})}},b1b9:function(t,i,a){"use strict";var s=a("2aba"),n=a.n(s);n.a},bfaf:function(t,i,a){"use strict";a.r(i);var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{ref:"vw",staticClass:"video-wp"},[a("div",{staticClass:"vin"},[a("div",{staticClass:"v-left"},[a("div",{staticClass:"tit"},[t._v(t._s(t.info.name)+" - "+t._s(t.info.artistName))]),a("div",{staticClass:"video"},[a("video",{ref:"player",attrs:{width:"830",height:"466",controls:"controls"}})]),a("div",{staticClass:"wd"},[t._v(t._s(t.info.desc))]),a("div",{staticClass:"tips"},[t._v("发布："+t._s(t.info.publishTime)+" "),a("span",[t._v("播放：")]),t._v(t._s(t.info.playCount)+"次")]),0===t.comments.length?a("div",{staticClass:"noc"},[t._v("还没有评论哦")]):t._e(),a("comments",{attrs:{hot:t.hot,comments:t.comments,cnum:t.cnum}}),a("pagination",{attrs:{pageSize:t.pageSize,total:t.cnum},on:{goPage:t.goPage}})],1),a("div",{staticClass:"v-right"},[a("div",{staticClass:"tit"},[t._v("相关推荐")]),a("div",{staticClass:"tmv"},t._l(t.mvList,(function(t){return a("mv-list-item",{attrs:{obj:t}})})),1)])])])},n=[],e=(a("e35a"),a("0d7a"),a("e6a2")),c=a("8e05"),o=a("10f1"),r=a("642f"),u={name:"Video",data:function(){return{player:null,info:{},hot:[],comments:[],cnum:0,pageSize:20,mvList:[],id:"",page:0}},components:{Comments:e["a"],Pagination:c["a"],MvListItem:o["a"]},mounted:function(){this.init()},watch:{$route:function(t,i){this.init()}},methods:{goPage:function(t){this.page=t-1,this.getCom(),this.$refs.vw.scrollTop=520},getCom:function(){var t=this,i=this.page*this.pageSize;Object(r["c"])(this.id,this.pageSize,i).then((function(i){t.cnum=i.total,t.comments=i.comments,t.hot=i.hotComments}))},init:function(){var t=this;this.id=this.$route.params.id,this.player=this.$refs.player,Object(r["b"])(this.id).then((function(i){t.player.src="//"+i.data.url.split("//")[1]})),this.player.onplaying=function(){t.$bus.$emit("pause")},Object(r["d"])(this.id).then((function(i){t.info=i.data})),this.getCom(),Object(r["e"])(this.id).then((function(i){t.mvList=i.mvs}))}}},m=u,l=(a("1830"),a("9ca4")),d=Object(l["a"])(m,s,n,!1,null,"4ac5cd8d",null);i["default"]=d.exports}}]);
//# sourceMappingURL=chunk-246232da.8222665c.js.map
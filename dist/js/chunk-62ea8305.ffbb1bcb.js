(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62ea8305"],{"10f1":function(t,i,s){"use strict";var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"mv-item",on:{click:t.goMV}},[s("img",{staticClass:"img",attrs:{src:t.obj.picUrl||t.obj.cover}}),s("div",{staticClass:"paly-num"},[s("i",{staticClass:"el-icon-caret-right"}),t._v(t._s(t.obj.playCount))]),s("div",{staticClass:"wd"},[t._v(t._s(t.obj.name))]),s("div",{staticClass:"name"},[t._v(t._s(t.obj.artistName))]),t._m(0)])},n=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"icon-hide amt"},[s("i",{staticClass:"el-icon-caret-right"})])}],a={name:"MvListItem",props:{obj:{type:Object,default:function(){return{}}}},methods:{goMV:function(){this.$router.push("/video/"+this.obj.id)}}},c=a,o=(s("40f8"),s("9ca4")),r=Object(o["a"])(c,e,n,!1,null,"49be3cbf",null);i["a"]=r.exports},"40f8":function(t,i,s){"use strict";var e=s("fb93"),n=s.n(e);n.a},"4f63":function(t,i,s){},"642f":function(t,i,s){"use strict";s.d(i,"a",(function(){return n})),s.d(i,"b",(function(){return a})),s.d(i,"d",(function(){return c})),s.d(i,"c",(function(){return o})),s.d(i,"e",(function(){return r}));var e=s("1bab");function n(t,i,s,n,a){return Object(e["a"])({url:"/mv/all",params:{limit:t,offset:i,area:s,order:n,type:a}})}function a(t){return Object(e["a"])({url:"/mv/url",params:{id:t}})}function c(t){return Object(e["a"])({url:"/mv/detail",params:{mvid:t}})}function o(t,i,s){return Object(e["a"])({url:"/comment/mv",params:{id:t,pageSize:i,offset:s}})}function r(t){return Object(e["a"])({url:"/simi/mv",params:{mvid:t}})}},bfaf:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{ref:"vw",staticClass:"video-wp"},[s("div",{staticClass:"vin"},[s("div",{staticClass:"v-left"},[s("div",{staticClass:"tit"},[t._v(t._s(t.info.name)+" - "+t._s(t.info.artistName))]),s("div",{staticClass:"video"},[s("video",{ref:"player",attrs:{width:"830",height:"466",controls:"controls"}})]),s("div",{staticClass:"wd"},[t._v(t._s(t.info.desc))]),s("div",{staticClass:"tips"},[t._v("发布："+t._s(t.info.publishTime)+" "),s("span",[t._v("播放：")]),t._v(t._s(t.info.playCount)+"次")]),0===t.comments.length?s("div",{staticClass:"noc"},[t._v("还没有评论哦")]):t._e(),s("comments",{attrs:{hot:t.hot,comments:t.comments,cnum:t.cnum}}),s("pagination",{attrs:{pageSize:t.pageSize,total:t.cnum},on:{goPage:t.goPage}})],1),s("div",{staticClass:"v-right"},[s("div",{staticClass:"tit"},[t._v("相关推荐")]),s("div",{staticClass:"tmv"},t._l(t.mvList,(function(t){return s("mv-list-item",{attrs:{obj:t}})})),1)])])])},n=[],a=s("e6a2"),c=s("8e05"),o=s("10f1"),r=s("642f"),u={name:"Video",data:function(){return{player:null,info:{},hot:[],comments:[],cnum:0,pageSize:20,mvList:[],id:"",page:0}},components:{Comments:a["a"],Pagination:c["a"],MvListItem:o["a"]},mounted:function(){var t=this;this.id=this.$route.params.id,this.player=this.$refs.player,Object(r["b"])(this.id).then((function(i){t.player.src=i.data.url})),Object(r["d"])(this.id).then((function(i){t.info=i.data})),this.getCom(),Object(r["e"])(this.id).then((function(i){t.mvList=i.mvs}))},watch:{$route:function(t,i){this.$router.go(0)}},methods:{goPage:function(t){this.page=t-1,this.getCom(),this.$refs.vw.scrollTop=520},getCom:function(){var t=this,i=this.page*this.pageSize;Object(r["c"])(this.id,this.pageSize,i).then((function(i){t.cnum=i.total,t.comments=i.comments,t.hot=i.hotComments}))}}},m=u,l=(s("fcc7"),s("9ca4")),f=Object(l["a"])(m,e,n,!1,null,"7ccd2e70",null);i["default"]=f.exports},fb93:function(t,i,s){},fcc7:function(t,i,s){"use strict";var e=s("4f63"),n=s.n(e);n.a}}]);
//# sourceMappingURL=chunk-62ea8305.ffbb1bcb.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-686ff788"],{"2eeb":function(t,a,e){"use strict";var n=e("1c8b"),i=e("5dfd").map,s=e("1ea7"),r=e("ff9c"),o=s("map"),c=r("map");n({target:"Array",proto:!0,forced:!o||!c},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},"491d":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"main",attrs:{id:"main"}},[Object.keys(t.info).length>1?e("div",{staticClass:"ml-info-wp"},[e("div",{staticClass:"ml-img"},[e("img",{attrs:{src:t._f("imageUrl")(t.info.coverImgUrl)}})]),e("div",{staticClass:"ml-info"},[e("div",{staticClass:"ml-tit1"},[t._v(t._s(t.info.name))]),e("div",{staticClass:"ml-tit2"},[e("img",{attrs:{src:t._f("imageUrl")(t.info.creator.avatarUrl)}}),e("span",{staticClass:"name"},[t._v(t._s(t.info.creator.nickname))]),e("span",{staticClass:"time"},[t._v(t._s(t._f("dfmt")(t.info.createTime))+" 创建")])]),e("div",{staticClass:"ml-bn",on:{click:t.playAll}},[t._v(" 播放全部 ")]),e("div",{staticClass:"ml-tips"},[t._v(" 标签："+t._s(t.info.tags)+" ")]),e("div",{staticClass:"ml-wd"},[t._v(" 简介："+t._s(t.info.description)+" ")])])]):t._e(),e("div",{staticClass:"ml-list-wp"},[e("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"歌曲列表",name:"first"}},[e("songs-list",{ref:"songs",attrs:{mTableData:t.mTableData},on:{imgDone:t.imgDone}})],1),e("el-tab-pane",{attrs:{label:t.tabTit,name:"second"}},[e("comments",{attrs:{hot:t.hot,comments:t.comments,cnum:t.cnum}}),e("pagination",{attrs:{pageSize:t.pageSize,total:t.cnum},on:{goPage:t.goPage}})],1)],1)],1)])},i=[],s=(e("3466"),e("2eeb"),e("e18c"),e("1c2e"),e("8e05")),r=e("ac58"),o=e("e6a2"),c=e("3f4e"),l=e("90b9"),m=e("eecb"),u={name:"MusicList",data:function(){return{info:{},mTableData:[],activeName:"first",trackIds:[],firstCK:!1,id:"",cnum:0,tabTit:"",comments:[],hot:[],pageSize:20,loading:!0,loadNum:0,cur:-1}},mixins:[m["b"]],components:{Pagination:s["a"],Comments:o["a"],SongsList:r["a"]},created:function(){var t=this,a=this.$route.params.id;this.id=a,Object(c["b"])(a).then((function(a){t.info=a.playlist,t.trackIds=a.playlist.trackIds,t.createList(t.trackIds),t.loading=!1})),Object(c["a"])(a,this.pageSize,0).then((function(a){t.comments=a.comments,t.hot=a.hotComments,t.cnum=a.total,t.tabTit="评论("+a.total+")"}))},filters:{dfmt:function(t){var a=new Date(t);return Object(l["a"])("YYYY-mm-dd",a)}},mounted:function(){var t=this,a=this;this.$bus.$on("openList",(function(e){t.cur=-1,t.mTableData.findIndex((function(t,n,i){e===t.id&&(a.cur=n)})),void 0!=t.$refs.songs&&(t.$refs.songs.cur=t.cur)}))},methods:{handleClick:function(){},handleCurrentChange:function(t){this.currentRow=t},createList:function(t){var a=this,e=t.map((function(t,a,e){return t.id}));Object(c["c"])(e.toString()).then((function(t){a.mTableData=t.songs}))},goPage:function(t){var a=this,e=(t-1)*this.pageSize;Object(c["a"])(this.id,this.pageSize,e).then((function(t){a.comments=t.comments,a.hot=0===e?t.hotComments:[],document.getElementById("main").scrollTop=460,a.loading=!1}))},playAll:function(){this.playSong(this.mTableData[0])},imgDone:function(){this.loading=!1}}},f=u,d=(e("f8bd"),e("9ca4")),h=Object(d["a"])(f,n,i,!1,null,"4cf52e79",null);a["default"]=h.exports},"4e22":function(t,a,e){},"9be4":function(t,a,e){},a2f9:function(t,a,e){"use strict";var n=e("9be4"),i=e.n(n);i.a},ac58:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"slist"},[e("el-table",{ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:t.mTableData,"highlight-current-row":""},on:{"row-click":t.playSong,"current-change":t.handleCurrentChange}},[e("el-table-column",{attrs:{type:"index",align:"center",width:"50"}}),e("el-table-column",{attrs:{label:" ",width:"130"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("img",{staticClass:"timg",attrs:{src:t.imgSrc(a)},on:{load:t.timgload}})]}}])}),e("el-table-column",{attrs:{property:"name",label:"音乐标题",width:""}}),e("el-table-column",{attrs:{property:"name",formatter:t.person,label:"歌手"}}),e("el-table-column",{attrs:{property:"name",label:"专辑",formatter:t.edition,width:""}}),e("el-table-column",{attrs:{property:"dt",formatter:t.fomat,width:"100",label:"时长"}})],1)],1)},i=[],s=(e("9302"),e("053b"),e("e35a"),e("0d7a"),e("52ef")),r=e("90b9"),o={name:"SongsList",data:function(){return{loadNum:0,firstCK:!1,cur:0}},props:{mTableData:{type:Array,default:function(){return[]}}},watch:{cur:function(){-1===this.cur?this.$refs.singleTable.setCurrentRow():this.$refs.singleTable.setCurrentRow(this.mTableData[this.cur])}},methods:{playSong:function(t){this.firstCK||(this.$store.commit("addMusicList",this.mTableData),this.firstCK=!0),this.$bus.$emit("play",t),this.$refs.singleTable.setCurrentRow(this.mTableData[this.cur])},handleCurrentChange:function(t){this.currentRow=t},timgload:function(){this.loadNum++,this.loadNum>=this.mTableData.length&&this.$emit("imgDone")},imgSrc:function(t){return t.row.hasOwnProperty("al")?"//"+t.row.al.picUrl.split("//")[1]+"?param=120y120":"//"+t.row.album.picUrl.split("//")[1]+"?param=120y120"},fomat:function(t){return t.hasOwnProperty("artists")?Object(r["c"])(t.duration/1e3):Object(r["c"])(t.dt/1e3)},person:function(t){if(t.hasOwnProperty("artists")){var a,e=[],n=Object(s["a"])(t.artists);try{for(n.s();!(a=n.n()).done;){var i=a.value;e.push(i.name)}}catch(m){n.e(m)}finally{n.f()}return e.join("/")}var r,o=[],c=Object(s["a"])(t.ar);try{for(c.s();!(r=c.n()).done;){var l=r.value;o.push(l.name)}}catch(m){c.e(m)}finally{c.f()}return o.join("/")},edition:function(t){return t.hasOwnProperty("artists")?t.album.name:t.al.name}}},c=o,l=(e("a2f9"),e("9ca4")),m=Object(l["a"])(c,n,i,!1,null,"360fece1",null);a["a"]=m.exports},f8bd:function(t,a,e){"use strict";var n=e("4e22"),i=e.n(n);i.a}}]);
//# sourceMappingURL=chunk-686ff788.395288ff.js.map
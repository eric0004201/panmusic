(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f150517"],{"10f1":function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"mv-item",on:{click:t.goMV}},[e("img",{staticClass:"img",attrs:{src:t.imagePath}}),e("div",{staticClass:"paly-num"},[e("i",{staticClass:"el-icon-caret-right"}),t._v(t._s(t.obj.playCount))]),e("div",{staticClass:"wd"},[t._v(t._s(t.obj.name))]),e("div",{staticClass:"name"},[t._v(t._s(t.obj.artistName))]),t._m(0)])},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"icon-hide amt"},[e("i",{staticClass:"el-icon-caret-right"})])}],a=(e("e35a"),e("0d7a"),{name:"MvListItem",props:{obj:{type:Object,default:function(){return{}}}},methods:{goMV:function(){this.$router.push("/video/"+this.obj.id)}},computed:{imagePath:function(){return this.obj.hasOwnProperty("picUrl")?"//"+this.obj.picUrl.split("//")[1]+"?param=320y180":"//"+this.obj.cover.split("//")[1]+"?param=320y180"}}}),c=a,r=(e("b1b9"),e("9ca4")),o=Object(r["a"])(c,n,s,!1,null,"b06d99aa",null);i["a"]=o.exports},"13c1":function(t,i,e){"use strict";var n=e("f954"),s=e.n(n);s.a},"17c5":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"main"},[e("div",{staticClass:"main-in"},[e("my-carousel",{attrs:{banner:t.banner}}),e("div",{staticClass:"tit"},[t._v("推荐歌单")]),e("song-sheet",{attrs:{songs:t.songs}}),e("div",{staticClass:"tit"},[t._v("最新音乐")]),e("new-music",{attrs:{list:t.list}}),e("div",{staticClass:"tit"},[t._v("推荐MV")]),e("mv-list",{attrs:{"mv-list":t.mvList}})],1)])},s=[],a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"carousel"},[e("el-carousel",{attrs:{interval:4e3,type:"card",height:t.gheight}},t._l(t.banner,(function(i,n){return e("el-carousel-item",{key:i.imageUrl},[e("img",{staticClass:"img",attrs:{src:t._f("imageUrl")(i.imageUrl)}})])})),1)],1)},c=[],r=e("eecb"),o={name:"MyCarousel",props:{banner:{type:Array,default:function(){return[]}}},data:function(){return{dw:document.documentElement.clientWidth}},computed:{gheight:function(){var t=135*this.dw/1e3;return this.dw>1e3&&(t+=.05*(this.dw-1e3)),t+"px"}},mixins:[r["d"]],mounted:function(){var t=this;window.onresize=function(){t.dw=document.documentElement.clientWidth}}},u=o,l=(e("3bb1"),e("9ca4")),m=Object(l["a"])(u,a,c,!1,null,"34dc4b9a",null),d=m.exports,f=e("a096"),v=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"new"},t._l(t.list,(function(i,n){return e("div",{key:n,staticClass:"new-item",on:{click:function(e){return t.play(i)}}},[e("div",{staticClass:"num"},[t._v(t._s(t.numFormt(n)))]),e("div",{staticClass:"img"},[e("img",{attrs:{src:t._f("imageUrl")(i.picUrl)}})]),e("div",{staticClass:"wd"},[e("div",{staticClass:"tip"},[t._v(t._s(i.name))]),e("div",[t._v(t._s(t.sname(i.song.artists)))])])])})),0)},h=[],p=(e("e35a"),e("0d7a"),{name:"NewMusic",computed:{numFormt:function(){return function(t){var i=parseInt(t)+1;return i=i<10?"0"+i:i,i}}},mixins:[r["a"]],filters:{imageUrl:function(t){return"//"+t.split("//")[1]+"?param=100y100"}},props:{list:{type:Array,default:function(){return[]}}},methods:{play:function(t){this.$store.commit("addMusic",t.song),this.$bus.$emit("play",t.song)}}}),b=p,g=(e("c0c1"),Object(l["a"])(b,v,h,!1,null,"9fe7937e",null)),_=g.exports,y=e("2aeb"),C=e("2b9f"),j={name:"FindMusic",data:function(){return{banner:[],songs:[],list:[],mvList:[]}},components:{MyCarousel:d,SongSheet:f["a"],NewMusic:_,MvList:y["a"]},mounted:function(){var t=this;this.$store.commit("setTitle","发现音乐"),Object(C["a"])().then((function(i){t.banner=i.banners})),Object(C["i"])().then((function(i){t.songs=i.result})),Object(C["f"])().then((function(i){t.list=i.result})),Object(C["d"])().then((function(i){t.mvList=i.result}))}},w=j,$=(e("f51d"),Object(l["a"])(w,n,s,!1,null,"56910faf",null));i["default"]=$.exports},"2aba":function(t,i,e){},"2aeb":function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"mv-list"},[t._l(t.mvList,(function(t){return e("mv-list-item",{key:t.name,attrs:{obj:t}})})),e("i"),e("i"),e("i"),e("i")],2)},s=[],a=e("10f1"),c={name:"MvList",props:{mvList:{type:Array,default:function(){return[]}}},components:{MvListItem:a["a"]}},r=c,o=(e("9370"),e("9ca4")),u=Object(o["a"])(r,n,s,!1,null,"04f91f6b",null);i["a"]=u.exports},"3bb1":function(t,i,e){"use strict";var n=e("5ffd"),s=e.n(n);s.a},"5ffd":function(t,i,e){},9370:function(t,i,e){"use strict";var n=e("bc58"),s=e.n(n);s.a},a096:function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"song-list"},[t._l(t.songs,(function(i,n){return e("song-sheet-item",{key:n,attrs:{obj:i},on:{imgLoad:t.imgDone}})})),e("i"),e("i"),e("i"),e("i"),e("i")],2)},s=[],a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"song-item",on:{click:t.toMusicList}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imagePath,expression:"imagePath"}],staticClass:"img",on:{load:t.imgLoad}}),e("div",{staticClass:"wd"},[t._v(t._s(t.obj.name))]),e("div",{staticClass:"wd-hide amt"},[t._v(t._s(t.hideWd))]),t._m(0)])},c=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"icon-hide amt"},[e("i",{staticClass:"el-icon-caret-right"})])}],r=(e("e35a"),e("0d7a"),{name:"SongSheetItem",props:{obj:{type:Object,default:function(){return{}}}},computed:{hideWd:function(){return this.obj.hasOwnProperty("picUrl")?this.obj.copywriter:"播放量："+this.obj.playCount},imagePath:function(){return this.obj.hasOwnProperty("picUrl")?"//"+this.obj.picUrl.split("//")[1]+"?param=300y300":"//"+this.obj.coverImgUrl.split("//")[1]+"?param=300y300"}},methods:{toMusicList:function(){this.$router.push("/musiclist/"+this.obj.id)},imgLoad:function(){this.$emit("imgLoad")}}}),o=r,u=(e("c39e"),e("9ca4")),l=Object(u["a"])(o,a,c,!1,null,"1a522036",null),m=l.exports,d={name:"SongSheet",props:{songs:{type:Array,default:function(){return[]}}},mounted:function(){},methods:{imgDone:function(){this.$emit("imgDone")}},components:{SongSheetItem:m}},f=d,v=(e("13c1"),Object(u["a"])(f,n,s,!1,null,"1a026b69",null));i["a"]=v.exports},b1b9:function(t,i,e){"use strict";var n=e("2aba"),s=e.n(n);s.a},bc01:function(t,i,e){},bc58:function(t,i,e){},c0c1:function(t,i,e){"use strict";var n=e("bc01"),s=e.n(n);s.a},c39e:function(t,i,e){"use strict";var n=e("edd3"),s=e.n(n);s.a},edd3:function(t,i,e){},edf7:function(t,i,e){},f51d:function(t,i,e){"use strict";var n=e("edf7"),s=e.n(n);s.a},f954:function(t,i,e){}}]);
//# sourceMappingURL=chunk-4f150517.6043c86a.js.map
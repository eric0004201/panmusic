export function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}
export function throttle(func, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}
export function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
export function fenFormat(s){
    var h;
    h  =   Math.floor(s/60);
    s  =   s%60;
    h    +=    '';
    s    +=    '';
    h  =   (h.length==1)?'0'+h:h;
		s = parseInt(s);
    s  =   (s<10)?'0'+s:s;
    return h+':'+s;
}
export function randomFrom(lowerValue,upperValue)
{
 return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

export function setItem(obj,type="collectList"){
	
	if(localStorage.getItem(type) === null){
		obj.isCollect = true;
		let arr=[]
		arr.push(obj)
		localStorage.setItem(type,JSON.stringify(arr))
		
	}else{
		let sc =  JSON.parse(localStorage.getItem(type))
		
		let old = sc.find(item=>{
			return obj.id === item.id;
		})
		
		if(!old){
			obj.isCollect = true;
			sc.unshift(obj);
			localStorage.setItem(type,JSON.stringify(sc))
		}
		
		
	}
}

export function removeItem(obj,type="collectList"){
	if(localStorage.getItem(type) === null){
	}else{
		let sc =  JSON.parse(localStorage.getItem(type))
		let i = sc.findIndex(item =>{
			return obj.id === item.id
		})
		if(i !== -1){
			sc.splice(i,1)
			localStorage.setItem(type,JSON.stringify(sc))
		}
	}
}

export function checkCollect(id,type="collectList"){
	if(localStorage.getItem(type) !== null){
		let sc =  JSON.parse(localStorage.getItem(type))
		let i = sc.findIndex(item =>{
			return id === item.id
		})
		
		if(i !== -1){
			return true
		}else{
			return false
		}
	}
}

export function setNav(nav){
	localStorage.setItem("navCollapse",nav);
}

export function getNav(){
	if(localStorage.getItem("navCollapse") === null){
		return true
	}else{
		return localStorage.getItem("navCollapse") === "true"
	}
}

function hasClass( elements,cName ){ 
  return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
}; 
export function addClass( elements,cName ){ 
  if( !hasClass( elements,cName ) ){ 
    elements.className += " " + cName; 
  }; 
}; 
export function removeClass( elements,cName ){ 
  if( hasClass( elements,cName ) ){ 
    elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
  }; 
};

export function setUser(name){
	localStorage.setItem("user",name);
}
export function getUser(){
	if(localStorage.getItem("user") === null){
		return '用户'
	}else{
		return localStorage.getItem("user");
	}
	
}

export function setMySheet(name){
	
	if(localStorage.getItem('mySheet') === null){
		let s = [];
		let o = {};
		o.name = name;
		o.list = [];
		s.push(o)
		
		return new Promise((resolve,reject) => {
			localStorage.setItem('mySheet',JSON.stringify(s))
			resolve()
		})
	}else{
		let ss =  JSON.parse(localStorage.getItem('mySheet'))
		
		let old = ss.find(item=>{
			return name === item.name;
		})
		let o = {};
		o.name = name;
		o.list = [];
		return new Promise((resolve,reject) => {
			if(!old){
				ss.push(o);
				localStorage.setItem('mySheet',JSON.stringify(ss))
				resolve()
			}else{
				reject("已存在！")
			}
		})
	}
}

export function getMySheet(type = 1){
	if(localStorage.getItem('mySheet') === null){
		return [];
	}else{
		if(type === 2){
			let s = JSON.parse(localStorage.getItem('mySheet'));
			let arr = []
			s.forEach(item => {
				arr.push(item.name)
			})
			return arr
		}else{
			return JSON.parse(localStorage.getItem('mySheet'))
		}
		
	}
}
export function getMySheetAll(){
	if(localStorage.getItem('mySheet') === null){
		return [];
	}else{
		let s = JSON.parse(localStorage.getItem('mySheet'));
		
		return s
		
		
	}
}

export function setMySheetItem(name,obj,all=1){
	if(localStorage.getItem('mySheet') === null){
		this.$alert("还没有歌单哦！请先新建一个吧").catch(() =>{})
		return
	}else{
		let s = JSON.parse(localStorage.getItem('mySheet'));
		let index = s.findIndex(item => {
			return name === item.name
		})
		if(all === 2){
			s[index].list = [];
			s[index].list.push(...obj);
			localStorage.setItem('mySheet',JSON.stringify(s))
		}else{
			let old = s[index].list.find(item=>{
				return obj.name === item.name;
			})
			return new Promise((sus,err) => {
				if(!old){
					
					s[index].list.unshift(obj);
					localStorage.setItem('mySheet',JSON.stringify(s))
					sus()
				}else{
					err()
				}
			})
		}
		
		
		
	}
}

export function getMySheetItem(name){
	if(localStorage.getItem('mySheet') === null){
		return [];
	}else{
		let s = JSON.parse(localStorage.getItem('mySheet'));
		let index = s.findIndex(item => {
			return name === item.name
		})
		return s[index].list;
	}
}


export function removeMySheet(name){
	let s =  JSON.parse(localStorage.getItem('mySheet'))
	let index = s.findIndex(item => {
		return name === item.name
	})
	s.splice(index,1);
	localStorage.setItem('mySheet',JSON.stringify(s))
}

export function setUid(id){
	localStorage.setItem("uid",id);
}
export function getUid(){
	return localStorage.getItem("uid");
}

export function group(arr, step) {
    return arr.reduce((x, y) => {
        return Array.isArray(x) ? (x[x.length - 1].push(y) == step ? [...x, []] : x) : [[x, y]];
    })
}
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
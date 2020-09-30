import cloudbase from "@cloudbase/js-sdk/app";
import "@cloudbase/js-sdk/auth";
import "@cloudbase/js-sdk/database";
import store from '../store'
import { getUser, getMySheetAll, setLogin,setUid, getUid } from "./utils.js"
import { MessageBox,Message } from 'element-ui';

const app = cloudbase.init({
	env: "panmusic-6g81iwxweac0062e"
});
const auth = app.auth({
	 persistence: "local"
});
const db = app.database();
const collection = db.collection("user");

export function login(email,pwd){
	return new Promise((sus,err)=>{
		auth.signInWithEmailAndPassword(email, pwd).then((loginState) => {
			Message('欢迎回来！');
			sus(loginState)
		}).catch((e) =>{
			console.log(err)
			err(e)
			MessageBox.alert('邮箱地址或密码不对，请重新输入！')
			
			
		});
	})
}



export function isLogin(){
	const loginState = auth.hasLoginState();
	if (loginState) {
		setUid(loginState.user.uid)
	  return true
	} else {
	  return false
	}
}

export function loginOut(){
	auth.signOut().then(res=>{
		console.log(res)
	}).catch(err=>{
		console.log(err)
	});
}

export function register(email,pwd){
	return new Promise((sus,err)=>{
		auth.signUpWithEmailAndPassword(email, pwd).then((res) => {
				MessageBox.alert('恭喜，注册成功啦，请在2小时内前往邮箱激活')
				sus(res)
				console.log(res)
		}).catch(err =>{
			MessageBox.alert('邮箱地址已存在，请重新注册！')
			err(err)
			console.log(err)
		});
	});
}

export function setNickName(name){
	let songSheet = localStorage.getItem("songSheet");
	let collectList = localStorage.getItem("collectList");
	let mySheet = localStorage.getItem("mySheet");
	if(songSheet===null) {
		songSheet =[]
	}else{
		songSheet = JSON.parse(songSheet)
	}
	if(collectList===null) {
		collectList =[]
	}else{
		collectList = JSON.parse(collectList)
	}
	if(mySheet===null) {
		mySheet =[]
	}else{
		mySheet = JSON.parse(mySheet)
	}
	collection
	 .add({
	    name: name,
			mySheet:mySheet,
			collectList:collectList,
			songSheet:songSheet
	  })
	  .then((res) => {
			console.log(res)
			
		})
}
export function getNickName(){
	
	return new Promise((sus,err)=>{
		collection
		.where({
		   _openid: getUid()
		})
		.get()
		.then((res) => {
			sus(res)
		})
	})
}

export function setYun(){
	let songSheet = localStorage.getItem("songSheet");
	let collectList = localStorage.getItem("collectList");
	let mySheet = localStorage.getItem("mySheet");
	if(songSheet===null) {
		songSheet =[]
	}else{
		songSheet = JSON.parse(songSheet)
	}
	if(collectList===null) {
		collectList =[]
	}else{
		collectList = JSON.parse(collectList)
	}
	if(mySheet===null) {
		mySheet =[]
	}else{
		mySheet = JSON.parse(mySheet)
	}
	return new Promise((sus,err)=>{
		collection
		.update({
			mySheet:mySheet,
			collectList:collectList,
			songSheet:songSheet
	  }).then(function (res) {
			sus(res)
		});
	})
}

export function getYunList(){
	return new Promise((sus,err)=>{
		
		collection
		.where({
		   _openid: getUid()
		})
		.get()
		.then((res) => {
			
			if(res.data.length ===0){
				sus([])
			}else{
				sus(res.data[0])
			}
			//sus(res.data[0].list)
		})
	})
	
}


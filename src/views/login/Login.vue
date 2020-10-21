<template>
	<div class="login" v-if="showmt">
		<div class="login-in">
			<div class="tit">邮箱账号登录</div>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="邮箱" 
											:rules="[
												{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
												{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
											]"
											prop="email">
					<el-autocomplete class="auto" v-model.email="ruleForm.email" :fetch-suggestions="querySearch" :trigger-on-focus="false"></el-autocomplete>
			  </el-form-item>
				<el-form-item label="密码" 
											:rules="[{ required: true, message: '请输入密码', trigger: 'blur' },]"
											prop="pass">
			    <el-input type="password" 
										ref='pwd'
										v-model="ruleForm.pass" 
										@keyup.enter.native="submitForm('ruleForm')"
										autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			    <el-button class="lk" @click="res" type="text">还没有账号，赶紧注册一个</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {login, register,isLogin} from "common/login.js"
	export default{
		name:"Login",
		computed:{
			showmt(){
				return !!(this.$route.path.indexOf('login')>0)
			}
		},
		mounted() {
		
		},
		
		data() {
			
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			
			return {
				path:'',
				restaurants:this.loadAll(),
				ruleForm: {
					pass: '',
					email:''
					
				},
				rules: {
					pass: [
						{ validator: validatePass, trigger: 'blur' }
					],
					
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						login(this.ruleForm.email,this.ruleForm.pass).then(res=>{
							this.$bus.$emit("login")
							this.$refs[formName].resetFields();
							this.$router.replace('/findmusic')
							
							
						}).catch(err=>{
							this.$refs.pwd.blur()
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			res(){
				
				this.$router.push("./register")
			},
			querySearch(queryString, callback) {
					let restaurants = this.restaurants
					let results = JSON.parse(JSON.stringify(restaurants))    
					let s = queryString.split("@")[1];
					
					if(s!==""&&s!==undefined){
						callback([])
					}else{
						for (let item in results) {
								results[item].value = queryString.replace(/@/g,'') + '' + restaurants[item].value
						}
						callback(results)
					}
					
			},
			createFilter() {  
			},
			loadAll() {
					return [
						{"value": "@163.com"},
						{"value": "@qq.com"},
						{"value": "@126.com"},
						{"value": "@sohu.com"},
						{"value": "@gmail.com"},
						{"value": "@sina.com"},
						{"value": "@outlook.com"},
						{"value": "@hotmail.com"},
							
					]
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 9;
		background: #fff;
		display: flex;
		align-items: center;
	}
	.tit,.bgon .tit{
		text-align: center;
		font-size: 17px;
		padding: 10px;
		padding-bottom: 20px;
		color: $black1;
	}
	.login-in{
		width: 450px;
		margin: 0 auto;
		border-radius: 5px;
		background: #d7f2f6;
		height: 300px;
		padding: 20px 60px 20px 10px;
		margin-top: -30px;
	}
	.bgon .login-in ::v-deep .lk span{
		color: #409EFF;
	}
	.auto{
		width: 280px;
	}
</style>

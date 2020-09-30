<template>
	<div class="login" v-if="showmt">
		<div class="login-in">
			<div class="tit">账号注册</div>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="注册邮箱" 
											:rules="[
												{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
												{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
											]"
											prop="email">
			    <el-input v-model.email="ruleForm.email"></el-input>
			  </el-form-item>
				<el-form-item label="密码" 
											:rules="[{ required: true, message: '请输入密码', trigger: 'blur' },]"
											prop="pass">
			    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			  </el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
			    <el-button class="lk" @click="res" type="text">已有账号，马上登录</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {login, register,isLogin} from "common/login.js"
	export default{
		name:"Register",
		computed:{
			showmt(){
				return !!(this.$route.path.indexOf('register')>0)
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
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					pass: '',
					checkPass: '',
					email:''
					
				},
				rules: {
					pass: [
						{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [
						{ validator: validatePass2, trigger: 'blur',required: true }
					],
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						
						register(this.ruleForm.email,this.ruleForm.pass).then(res =>{
							
							this.$router.push("./login")
						})
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			res(){
				this.$router.push("./login")
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
		padding: 20px 60px 20px 10px;
		margin-top: -30px;
	}
	.bgon .login-in ::v-deep .lk span{
		color: #409EFF;
	}
</style>

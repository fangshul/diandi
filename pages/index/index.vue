<template>
	
	<view class="box" >
		
		<!-- 侧边栏开始 -->
		<view class="selfinfo" :class="{startleft: if_info, endleft: !if_info}">
			
			<view class="selfinfoHead" :class="[ifhot ? 'hot' : 'cool']">
				<view class="indexLoginBtn" @click="indexLogin" v-if="!iflogin">登陆</view>
				<image :src="userInfo.avatarUrl" v-if="iflogin"></image>
				<view v-if="iflogin">
	
					<view>{{ userInfo.nickName }}</view>
					<view lang="zh_CN" class="address"> {{ userInfo.province }}{{ userInfo.city }}</view>
				</view>
			</view>
			<view class="bottomBox">
				<view class="self" @click="changeToSelf">
					<text class="iconfont iconxueshengguanli"></text>个人点滴
				</view>
				<view class="class" @click="changeToClass">
					<text class="iconfont iconbanjiguanli"></text>班级点滴
				</view>
				<view class="personal" @click="changeToPersonal">
					<text class="iconfont iconxueshengguanli"></text>我
				</view>
				<view class="set" @click="changeToSet">
					<text class="iconfont iconshezhi1"></text>设置
				</view>
			</view>
		</view>		
		<!-- 侧边栏结束 -->
		<!-- 主体内容开始 -->
		<view class="body"  :class="{startleft: if_info, endleft: !if_info}">
			
			<!-- 登录 -->
			<view class="login" v-if="!reallLogin" id="indexLoginBox"  @click="cancelLoginBox">
				<view class="loginBox" id="indexLoginChild">
					您需要先登录后才可发布点滴
					
					<button withCredentials="true" @getuserinfo="bindGetUserInfo"  class="loginBtn"  @click="login" open-type="getUserInfo">微信登录</button>
				</view>
				
			</view>
			
			<!-- 遮罩层 -->
			<view class="cover" v-if = "!if_info" @click="closeInfo"></view>
	
			<MyDiandi @toLogin="toLogin"  v-if="ifMyClass" :Thetitle="title" :login="iflogin" :permission="permission">
			
				<!-- 点开侧边栏按钮 start -->
				<view class="iconfont iconcaidan" @click="getinfo"></view>
				<!-- 点开侧边栏按钮 end -->
			</MyDiandi>
			<ClassDiandi v-if="ifInitClass" @toLogin="toLogin" :login="iflogin" @getclass="getClass" :classCode="inivCode" :classId="inviClass">
				
				
				<!-- 点开侧边栏按钮 start -->
				<view class="iconfont iconcaidan" @click="getinfo"> </view>
				<!-- 点开侧边栏按钮 end -->
			</ClassDiandi>
			<Personal v-if="ifPersonal" @classChange="classChange" :login="iflogin" @toLogin="toLogin" >
				<!-- 点开侧边栏按钮 start -->
				<view class="iconfont iconcaidan personalIcon" @click="getinfo" > </view>
				<!-- 点开侧边栏按钮 end -->
			</Personal>
			<Set v-if="set">
				<view class="iconfont iconcaidan personalIcon" @click="getinfo" > </view>
			</Set>
		</view>
		<!-- 主体内容结束 -->
		<popup v-if="ifNote" :infoData="noteData"></popup>
	</view>
	

</template>

<script>
	import self from '../../static/request.js'
	import MyDiandi from '../../components/MyDiandi.vue'
	import ClassDiandi from '../../components/ClassDiandi.vue'
	import Personal from '../../components/Personal.vue'
	import Set from '../../components/Set.vue'
	import publicFun from '@/static/public.js'
	import popup from '@/components/Popup.vue'
	export default {
		components: {
			MyDiandi,
			ClassDiandi,
			Personal,
			Set,
			popup
		},
		data() {
			return {
				infoData: '',
				userInfo: {},
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				hasUserInfo: false,
				if_info: true,
				ifHaveClass: false,
				title: '个人点滴',
				ifMyClass: true,
				ifInitClass: false,
				ifPersonal: false,
				ifphone: false,
				iflogin: false,
				permission: {},
				refresh: false,
				reallLogin: true,
				set: false,
				ifNote: false,
				noteData: '',
				inivCode: '',
				inviClass: '',
				ifhot: true,
				
			}
		},
		
		methods: {
			// 点滴遮罩层 关闭登陆
			cancelLoginBox (e) {
				if (e.currentTarget.id === e.target.id) {
					this.reallLogin = true
				}
			},
			indexLogin () {
				this.reallLogin = false
				this.closeInfo()
			},
			toLogin () {
				this.reallLogin = false
				
				this.changeToSelf()
				// wx.hideLoading()
			},
			// 在个人信息退出班级
			classChange () {
				this.ifHaveClass = false
				
				
			},
			
			// 加入班级时的传值
			getClass (data) {
				
				this.ifHaveClass = true
				this.ifInitClass = false
				this.ifMyClass = true
				this.ifPersonal = false
				
			},
			// 切换到设置
			changeToSet () {
				this.ifMyClass = false
				this.ifInitClass = false
				this.ifPersonal = false
				this.set = true
				
				this.closeInfo()
			},
			/**
			*切换到我的
			*/
			changeToPersonal () {
				this.ifMyClass = false
				this.ifInitClass = false
				this.ifPersonal = true
				this.set = false
				this.closeInfo()

			},
			/**
			*切换到班级点滴
			*/
			changeToClass () {
				
				if (this.ifHaveClass) {
					this.title = '班级点滴'
					this.ifMyClass = true
					this.ifInitClass = false
					
					
				} else {
					this.title = '班级点滴'
					this.ifMyClass = false
					this.ifInitClass = true
					
					
				}
				this.ifPersonal = false
				this.set = false
				this.closeInfo()
			},

			/**
			*切换到个人点滴
			*/
			changeToSelf () {
				this.title = '个人点滴'
				this.ifMyClass = true
				this.ifInitClass = false
				this.ifPersonal = false
				this.set = false
				this.closeInfo()
			},
			/**
			*关闭个人信息
			*/
			closeInfo () {
				this.if_info = true
			},

			/**
			* 点击展开个人信息
			*/
			getinfo () {
				this.if_info = false
			},
			// 登录
			login () {
				
				var _this = this
				
				//微信登陆
				wx.login({
					success(res) {
						
						// 成功获取 code
						if (res.code) {
						
							wx.showLoading({
								title:'正在登陆...',
								mask: true
							})
							
							// 登陆
							wx.request({
								url: 'https://wy.lujiahaoo.cn/dddx/api/auth/login/wxmp',
								method: 'POST',
								data:{
									code: res.code,
									name: _this.userInfo.nickName,
									avatar: _this.userInfo.avatarUrl
									
								},
								success(res) {
									wx.hideLoading()
									console.log('login',res)
									if (res.data.code === 200) {
										
										publicFun.note('登录成功',_this)
										uni.report('login','登录成功')
										_this.iflogin = true
										_this.reallLogin = true
										
										
										// token 缓存
										wx.setStorageSync('token',res.data.data.token)
									
										
										// 获取用户在小程序的信息
										_this.info()
										
										
									} else {
										_this.reallLogin = true
										publicFun.note(res.data.msg,_this)
									}
									
								},
								fail (res) {
									console.log(res)
								}
							})
						}
					}
				})
			},
			// 获取用户权限
			bindGetUserInfo (e) {
				 //用户按了允许授权按钮
				if (e.detail.userInfo){
					wx.getUserInfo({
						lang: "zh_CN",
						success: res => {
							
							this.userInfo = res.userInfo
							// 把用户信息赋值给全局变量 userinfo
							
							wx.showLoading({
								title: '正在登陆...',
								mask: true
							})
							this.login()
							
							
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				} else {
				  //用户按了拒绝按钮
				  publicFun.note('无法获取您的信息',this)
				 
				  
				  
				}
			},
			//获取用户在本小程序的个人信息
			info () {
				
				//获取个人信息
				self.getRequest('/user/profile',{
					
				},(res) => {
					console.log(res)
					wx.hideLoading()
				
					if (res.data.code === 200) {
						this.iflogin = true
						this.reallLogin = true
						// 用户信息
						this.infoData = res.data.data
						getApp().globalData.personal = this.infoData
						// 用户权限
						this.permission = this.infoData.permission
						if(this.infoData.class != null ) {
							// 有班级
							this.ifHaveClass = true
						} else {
							// 无班级
							this.ifHaveClass = false
						}
					
					} else if (res.data.code === 50001 || res.data.code === 50002 || res.data.code === 50003) {
						// 有权限但需要重新登陆
						// 如果获取不到信息则重新登陆
						this.iflogin = false
						console.log('有权限但需要重新登陆')
						// this.reallLogin = false
					
					} else {
						publicFun.note('无法获取您的信息',this)
					}
				}, (error) => {
					console.log('error',error)
				},'GET')
			}
		
		},
		watch: {
			iflogin () {
				wx.hideLoading()
				if (this.iflogin === true) {
					this.reallLogin = true
				} else {
					this.reallLogin = false
				}
				
			}
		},
		onLoad(option) {
		
			// 是否点邀请链接进来的
			if (option.share === 'true') {
				this.inivCode = option.code
				this.inviClass = option.classId
				this.changeToClass()
			}
		},
		mounted () {
			// 背景颜色
			if (wx.getStorageSync('bgColor') === 'code' ) {
				this.ifhot = false
			} else {
				this.ifhot = true
			}
			
			wx.showLoading({
				title: '正获取信息...',
				mask: true
			})
			
			//查看是否授权（已授权则可以获取用户微信信息）
			wx.getSetting({
			  success: res => {
				
				if (res.authSetting['scope.userInfo']) {
				
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						lang: "zh_CN",
						success: res => {
							
							// 用户信息赋值
							this.userInfo = res.userInfo
							
							// 把用户信息赋值给全局变量 userinfo
							getApp().globalData.userInfo = this.userInfo
							
							// 获取用户在小程序里的信息
							this.info()
							
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				} else {
				
					// 没有授权 则没有登陆过   iflogin = false 弹出登陆弹窗
					wx.hideLoading()
					console.log('没有授权',getApp().globalData.ifFirst)
					if (getApp().globalData.ifFirst) {
						uni.redirectTo({
						    url: '../guide/guide'
						})
						getApp().globalData.ifFirst = false
					
					}
					// uni.redirectTo({
					//     url: '../guide/guide'
					// })
					this.iflogin = false
					// this.reallLogin = false
					
				}
			  },
			  fail : res => {
				  console.log(res)
			  }
			})
			
			
			
			
		}
	}
</script>

<style>
	 /*pages/home/home.wxss */
	.indexLoginBtn{
		font-size: 40rpx;
		letter-spacing: 5rpx;
	}
	 .startleft{
		 left: -380upx;
	 }
	 .endleft{
		 left: 0;
	 }
	.box{
		display: flex;
	}
	/*侧边栏开始*/
	.selfinfo{
	
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 380rpx;
		flex-shrink: 0;
		background: #fff;
		position: relative;
		transition: all 0.5s ease-in-out ;
		height: 100vh;
	}
	.selfinfoHead{
		height: 372rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
	}
	.selfinfoHead> view {
		margin-left: 27rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.selfinfoHead>image{
		width: 123rpx;
		height: 123rpx;
		border-radius: 3rpx;
	}
	.address{
		margin-top: 10rpx;
	}
	.personal,
	.self,
	.class,
	.set{
		margin-top: 110rpx;
		font-size: 36rpx;
	}
	.bottomBox{
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
	}
	.iconxueshengguanli,
	.iconbanjiguanli,
	.iconxueshengguanli,
	.iconshezhi1{
		margin-right: 10rpx;
	}
	/*侧边栏结束*/
	
	/*主体内容开始*/
	.body {
		width: 100vw;
		flex-shrink: 0;
		position: relative;
		transition: all 0.5s ease-in-out;
	}
	/* 登录 */
	.login{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background-color: rgba(0,0,0,0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 15000;
	}
	.loginBox{
		width: 60vw;
		height: 30vh;
		border-radius: 5px;
		color: #fff;
		background-color: #98ba9a;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 37upx;
		padding: 50upx;
		letter-spacing: 5upx;
		line-height: 60upx;
	}
	.loginBtn{
		margin-top: 80upx;
	}
	.phoneLoginBtn{
		margin-top: 50upx;
	}
	.loginBtn,
	.phoneLoginBtn{
		width: 350upx;
		height: 80upx;
		border-radius: 5px;
		line-height: 80upx;
		text-align: center;
		background-color: #fff;
		color: #98BA9A;
		
	}
	
	/* 登录结束 */
	/*点开侧边栏按钮开始*/
	
	.iconcaidan{
		margin-left: 60rpx;
		font-size: 60rpx;
	}
	/*点开侧边栏按钮结束*/
	
	.cover{  /*点开侧边栏时的遮罩层*/
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background: rgba(0,0,0,0.3);
		z-index: 10000;
	
	}
	
	/*主体内容结束*/
	.personalIcon{
		position: relative;
		z-index: 17;
	}
</style>

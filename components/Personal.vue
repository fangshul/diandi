<template>
	<view class="personalBody">
		<!-- 选择菜单 -->
		<slot></slot>
		<!-- 选择菜单结束 -->
		<view class="personalHead">
			<view class="title">我的资料</view>
			<view class="editing" @click="editInfo">编辑</view>
		</view>
		<view class="personalInfo" >
			<view class="changeinput"  :class="ifedit ? 'inputStyle' : ''">
				<view>姓名：</view>
				<input type="text" name=""  :disabled = "!ifedit" v-model="name" />
			</view>

			<view class="changeinput"  :class="ifedit ? 'inputStyle' : ''">
				<view>手机：</view>
				<input type="text" name="" :disabled = "!ifedit" v-model="phone"/>
			</view>
			<view class="changeinput" :class="ifedit ? 'inputStyle' : ''">
				<view>Q Q：</view>
				<input type="text" name=""  :disabled = "!ifedit" v-model="qq"/>
			</view>
			<view class="changeinput"  :class="ifedit ? 'inputStyle' : ''">
				<view>微信：</view>
				<input type="text" name=""  :disabled = "!ifedit" v-model="wechat"/>
			</view>
			<view class="myschool">
				<view>学校：</view>
				<view >{{ schoolData }}</view>
				
			</view>
			<view class="classTitle">
				<text>我所加入的班级：</text>
				
				<view 
					class="quit" 
					v-if=" personalInfoData.class != null" 
					@click="quite" >退出</view>
			</view>
			<navigator class="myClass" :url="classLink" >{{ classData }}</navigator>
			
			<view class="btnBox">
				<view class="confirm" v-if="ifedit"   @click="confirmInfo">修改</view>
				<view class="cancel" v-if="ifedit" @click="cancelChange">取消</view>
			</view>
		</view>
		<!-- cover start -->
		<view class="cover"></view>
		<!-- cover end -->
		<!-- background start -->
		<view class="bg_paper" >
				<!-- 1 -->
				<view class="  index_1" :class="[ifhot ? 'paper_item_1' : 'paper_item_1_code']"></view>
			
				<!-- 2 -->
				<view class=" index_2" :class="[ifhot ? 'paper_item_2' : 'paper_item_2_code']"></view>
	
				<!-- 3 -->
				<view class="  index_3" :class="[ifhot ? 'paper_item_3' : 'paper_item_3_code']"></view>
	
				<!-- 4 -->
				<view class="  index_4" :class="[ifhot ? 'paper_item_4' : 'paper_item_4_code']"></view>
	
				<!-- 5 -->
				<view class=" index_5 " :class="[ifhot ? 'paper_item_5' : 'paper_item_5_code']"></view>
	
		</view>
		<!-- background end  -->
		<uni-popup ref="quite" type="dialog" :maskClick="true">
			<uni-popup-dialog 
				type="info" 
				title=" " 
				left="前往转让" 
				right="退出班级"  
				content="退出后班级将解散,是否继续退出" 
				:before-close="true" 
				@close="toChange" 
				@confirm="confirmQuit">
			</uni-popup-dialog>
		</uni-popup>
		
		<popup v-if="ifNote" :infoData="noteData"></popup>
	</view>
</template>

<script>
	import self from '../static/request.js'
	import popup from '@/components/Popup.vue'
	import publicFun from '@/static/public.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	export default {
		components: {
			popup,
			uniPopup,
			uniPopupDialog
		},
		props: {
			
			login: Boolean,
			
		},
		data() {
			return {
				ifedit: false,
				classData: '暂无',
				schoolData: '暂无',
				qq: '',
				phone: '',
				wechat: '',
				name: '',
				personalInfoData: '',
				ifhot: true,
				ifNote: false,
				noteData: '',
				classLink:'../addressList/addressList'
			};
		},
		
		methods: {
			// 去转让
			toChange (done) {
				
				uni.navigateTo({
				    url: '../addressList/addressList'
				})
				
				done()
			},
			// 确认解散
			confirmQuit (done) {
				
				self.getRequest('/class',{},(res) => {
				
					if (res.data.code === 200) {
						publicFun.note('退出成功',this)
						this.ifedit = false
						
						// 更新用户信息
						self.getRequest('/user/profile',{
						},(res) => {
						
							if (res.data.code === 200) {
								getApp().globalData.personal = res.data.data
								this.personalInfoData = res.data.data
								
							}
						},(err) => {
							console.log(err)
						},'GET')
						
						this.$emit('classChange',false)
						
						this.classData = '暂无'
						this.schoolData = '暂无'
						
					} else {
						publicFun.note(res.data.msg,this)
						
					}
				},(err) => {
					console.log(err)
				},'DELETE')
				done()
			},
			/**
			*修改个人信息
			*/
			editInfo () {
				this.ifedit = true
				
			},
			/**
			* 确认修改个人信息
			*/
			confirmInfo () {
				this.ifedit = false
				self.getRequest('/user/profile',{
					name: this.name,
					phone: this.phone,
					qq: this.qq,
					wechat: this.wechat
				},(res) => {
				
					if (res.data.code === 200) {
						publicFun.note('修改成功',this)
						// 更新用户信息
						self.getRequest('/user/profile',{
						},(res) => {
						
							if (res.data.code === 200) {
								getApp().globalData.personal = res.data.data
								this.personalInfoData = res.data.data
								
							}
						},(err) => {
							console.log(err)
						},'GET')
						
					
					} else {
						publicFun.note(res.data.msg,this)
						
						
					}
					
				},(error) => {
					console.log(error)
				},'PUT')
			
			},
			
			// 退出班级
			quite () {
				let superAdmin = getApp().globalData.personal.permission.super
				
				
				if (superAdmin) {
					// 是创建班级的人
					this.$refs.quite.open()
				} else {
					self.getRequest('/class',{},(res) => {
						console.log(res)
						if (res.data.code === 200) {
							publicFun.note('退出成功',this)
							this.ifedit = false
							this.classLink = ''
							// 更新用户信息
							self.getRequest('/user/profile',{
							},(res) => {
							
								if (res.data.code === 200) {
									getApp().globalData.personal = res.data.data
									this.personalInfoData = res.data.data
									
								}
							},(err) => {
								console.log(err)
							},'GET')
							
							this.$emit('classChange',false)
							
							this.classData = '暂无'
							this.schoolData = '暂无'
							
						} else {
							publicFun.note(res.data.msg,this)
							
						}
					},(err) => {
						console.log(err)
					},'DELETE')
				}
				
			},
			// 取消修改
			cancelChange () {
				this.ifedit = false
				this.phone = this.personalInfoData.phone
				this.qq = this.personalInfoData.qq
				this.wechat = this.personalInfoData.wechat
				
				this.name = this.personalInfoData.name
			}
		},
		mounted() {
			// 背景颜色
			if (wx.getStorageSync('bgColor') === 'code' ) {
				this.ifhot = false
			} else {
				this.ifhot = true
			}
			console.log(this.login)
			if (!this.login) {
				this.$emit('toLogin',false)
			} else {
				this.personalInfoData = getApp().globalData.personal
				this.phone = this.personalInfoData.phone
				this.qq = this.personalInfoData.qq
				this.wechat = this.personalInfoData.wechat
				
				this.name = this.personalInfoData.name
				
				if (this.personalInfoData.class != null) {
					this.classData = this.personalInfoData.class.name
					this.schoolData = this.personalInfoData.class.university
					
				} else {
					this.classLink = '#'
				}
			}
			
			
			
		},
		watch :{
			login () {
				console.log('watch',this.login)
				console.log('watch',getApp().globalData.personal)
				this.personalInfoData = getApp().globalData.personal
				this.phone = this.personalInfoData.phone
				this.qq = this.personalInfoData.qq
				this.wechat = this.personalInfoData.wechat
				
				this.name = this.personalInfoData.name
				
				if (this.personalInfoData.class != null) {
					this.classData = this.personalInfoData.class.name
					this.schoolData = this.personalInfoData.class.university
					
				} else {
					this.classLink = '#'
				}
			}
		}
	}
</script>

<style>
/*head start*/
.personalBody{
	position: relative;
}
.classTitle,
.myClass,
.myschool {
	padding-left: 28rpx;
	height: 70rpx;
	line-height: 70rpx;
}
.myschool view {
	display: inline-block;
}
.inputStyle{
	border: 1px solid #000;
	background: #fff;
}
.personalHead{
	display: flex;
	justify-content: space-between;
	position: relative;
	z-index: 17;
	height: 12vh;
	align-items: center;
}
.title{
	font-size: 40rpx;
	margin-left: 99rpx;
	letter-spacing: 15rpx;
}
.editing{
	font-size: 30rpx;
	margin-right: 70rpx;
}
/*head end*/
.personalCover{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	background: rgba(255,255,255,0.3);
	z-index: 15;
}
.personalInfo>view>view{
	margin-right: 10rpx;
}
.personalInfo{
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 17;
}
.personalInfo>view{
	width: 540rpx;
	margin-bottom: 35rpx;
	font-size: 30rpx;
}
.myClass{
	text-decoration:underline;
	width: 540rpx;

}
.personalInfo .confirm,
.cancel{
	width: 300rpx;
	height: 77rpx;

	line-height: 77rpx;
	margin-top: 10rpx;

}
.personalInfo .confirm{
	background: #98ba9a;
}
.cancel{
	/* width: 300rpx;
	height: 77rpx; */
	background-color: #CCCCCC;
	/* text-align: center; */
	/* line-height: 77rpx; */
}
.btnBox{
	display: flex;
	justify-content: space-between;
}
.quit{
	width: 172rpx;
	height: 64rpx;
	background: #c24545;
	line-height: 64rpx;
	display: inline-block;

}
.personalInfo .confirm,
.quit,
.cancel{
	text-align: center;
	border-radius: 5px;
	color: #fff;
}
.personalInfo .changeinput{
	
	padding-left: 28rpx;
	
	border-radius: 3px;
	height: 80rpx;
	line-height: 80rpx;
	display: flex;
}
.personalInfo .changeinput>input{
	display: inline-block;
	height: 80rpx;
}
/* background start*/


/*background end */
.cover{
	width: 100vw;
	height: 100vh;
	background: rgba(255,255,255,0.4);
	position: absolute;
	top: 0;
	z-index: 16;
}
/* .note{
	width: 80vw;
	height: 20vh;
	background-color: rgba(0,0,0,0.4);
	color: #fff;
	text-align: center;
	line-height: 20vh;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -10vh;
	margin-left: -40vw;
	z-index: 20;
	font-size: 35rpx;
} */
</style>

<template>
	<view>
		<view class="body">
			<!-- <view class="searchBox">
				<view class="search">
					<icon type="search" size="20"></icon>
					<input placeholder="谁输入关键字"  name=""/>
				</view>
			</view> -->
			<!-- 标题 -->
			<view class="titleBox">
				<view class="title">班级通讯录</view>
				<view class="titleBoxRight">
					<button 
						open-type="share" 
						class="invi" 
						@click="invi" 
						v-if="supers">
						邀请
					</button>
					
					<view class="setting" @click="changeSet" v-if="supers">
						设置																								
						<!-- <text class="iconfont iconshezhi"></text> -->
							
					</view>
				</view>
				
				
			</view>
			<view class="addressBock">
				<scroll-view  
					scroll-y="true" 
					class="address" 
					scroll-with-animation="true" 
					:scroll-into-view="letter">
					<view 
						class="letterBox" 
						v-for="(item,parentindex) in outputData" 
						:key="parentindex" 
						:id="item.id">
						<view class="letter">{{ item.id }}</view>
						<view class="itemBox">
							<view 
								class="item" 
								v-for="(child,index) in item.children " 
								:key="index"
								:data-index="index"
								:data-parent="item.id"
								@touchstart="touchstart" 
								@touchmove="touchmove"
								@click.self="popupUserInfo(child)"
								:style="child.left">
								<view 
									class="personalInfoBox"
									
									>
									<image :src="child.img" class="personalImg"></image>
									<view class="infoBox">
										<view>{{ child.name }}</view>
										<view class="phone">{{ child.phone }}</view>
										
									</view>
								</view>
								<view class="changeBox">
									<view @click.stop="changeClass">转让</view>
									<view @click.stop="moveOut">移出</view>
								</view>
								
							</view>
							
						</view>
					</view>	
					
				</scroll-view>
				
				<!-- 通讯录abc -->
				<view class="addressScroll">
					<view 
						v-for="(item,index) in wordArr" 
						:key="index"
						 @click="toLetter(item)" >
						 {{ item }}
					</view>
					
				</view>
			</view>
			<view class="count">共{{ count }}人</view>
		</view>
		
		<!-- 背景 -->
		<view class="bgCover"></view>
		<view class="bg">
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
		<!-- 信息弹窗 -->
		<view class="userInfo" v-if="disUserInfo" id="infoPopup" @click="bgCloseUserInfo">
			<view class="userInfoBox" id="infoPopupChld">
				<view class="popupTitleBox">
					<view class="popupTitle">同学信息</view>
					<view class="iconfont iconguanbi" @click="closeUserInfo"></view>
				</view>
				<view class="activeName activeInfo">姓名：{{ activeinfo.name }}</view>
				<view class="activePhone activeInfo">手机：{{ activeinfo.phone }}</view>
				<view class="activeWechart activeInfo">微信：{{ activeinfo.wechat }}</view>
				<view class="activeQQ activeInfo">QQ：{{ activeinfo.qq }}</view>
			</view>
		</view>
		<!-- 设置弹窗 -->
		<view class="popupBox"  v-if="ifPopup">
		
			<view class="popupSet">
				<view class="popupTitleBox">
					<view class="popupTitle">加入设置</view>
					<view class="iconfont iconguanbi" @click="closeSet"></view>
				</view>
				<view class="allowSearch">
					<view>是否允许被搜索</view>
					<view 
						class="switch" 
						@click="changesearch" 
						:class="{iconOn: searchBg,iconOff: !searchBg}" >
						<view  :class="{ iconLeft: searchBg,iconRight: !searchBg}"></view>
					</view>
				</view>
				<view class="allowJoin" >
					<view>是否允许直接加入</view>
					<view class="switch"  
						@click="changeJoin" 
						:class="{iconOn: joinBg,iconOff: !joinBg}"  >
						<view :class="{ iconLeft: joinBg,iconRight: !joinBg}" ></view>
					</view>
				</view>
				<block v-if="!joinBg">
					<view class="questionTitle">
						申请问题
					</view>
					<view class="question" @click="selectQuestion">
							
						{{ currentText }}
						<text 
							class="triangle" 
							:class="{iconstart: questionListHeight,icondown: !questionListHeight }">
						</text>
						<view 
							class="questionList" 
							:class="{boxStartH: questionListHeight,boxEndH: !questionListHeight }"  >
							<view 
								v-for="(item,index) in questionText" 
								:key="index" 
								@click.self="choice(index)">
								{{ item }}
							</view>
							
						</view>
					</view>
					<view class="answerTitle">答案</view>
					<input 
						class="answer" 
						type="text" 
						v-model="answer" 
						placeholder="请输入不多于12个字" 
						maxlength="12" 
						name="" />
				</block>
				
				<view class="saveSetting" @click="saveSet">保存</view>
			</view>
		
		</view>
		<popup v-if="ifNote" :infoData="noteData"></popup>
	</view>
</template>

<script>
	import self from '../../static/request.js'
	import pinyin from '../../static/pinyinUtil.js'
	import popup from '@/components/Popup.vue'
	import publicFun from '@/static/public.js'
	export default {
		components: {
			popup
		},
		data() {
			return {
				ifNote: false,
				noteData: '',
				ifhot: true,
				letter: '',
				searchBg: true,
				joinBg: false,
				questionListHeight: true,
				questionText:[
				  '你们的班歌是什么',
				  '你们班有多少人脱单了',
				  '你们班总共聚过几次会',
				  '你们班第一次班级聚会是在哪里办的',
				],
				currentText: '',
				ifPopup: false,
				supers: '',
				usersData: [
					{
						id: 'A',
						children: []
					},
					{
						id: 'B',
						children: []
					},
					{
						id: 'C',
						children: []
					},
					{
						id: 'D',
						children: []
					},
					{
						id: 'E',
						children: []
					},
					{
						id: 'F',
						children: []
					},
					{
						id: 'G',
						children: []
					},
					{
						id: 'H',
						children: []
					},
					{
						id: 'I',
						children: []
					},
					{
						id: 'J',
						children: []
					},
					{
						id: 'K',
						children: []
					},
					{
						id: 'L',
						children: []
					},
					{
						id: 'M',
						children: []
					},
					{
						id: 'N',
						children: []
					},
					{
						id: 'O',
						children: []
					},
					{
						id: 'P',
						children: []
					},
					{
						id: 'Q',
						children: []
					},
					{
						id: 'R',
						children: []
					},
					{
						id: 'S',
						children: []
					},
					{
						id: 'T',
						children: []
					},
					{
						id: 'U',
						children: []
					},
					{
						id: 'V',
						children: []
					},
					{
						id: 'W',
						children: []
					},
					{
						id: 'X',
						children: []
					},
					{
						id: 'Y',
						children: []
					},
					{
						id: 'Z',
						children: []
					},
					{
						id: '*',
						children: []
					},
				],
				outputData:[],
				count: 0,
				wordArr: [],
				queId: 0,
				answer: '',
				startX: '',
				moveX: '',
				personalId: '',
				touchPersonal: '',
				classCode: '',
				disUserInfo: false,
				activeinfo: {}
				
			}
		},
		onLoad(option) {
			wx.showShareMenu({
			  withShareTicket: true
			})
			
		
		},
		methods: {
			bgCloseUserInfo (e) {
				
				if (e.currentTarget.id === e.target.id) {
					this.disUserInfo = false
				}
			},
			popupUserInfo (child) {
				this.disUserInfo = true
				this.activeinfo = child
				// console.log(child)
			},
			closeUserInfo() {
				this.disUserInfo = false
			},
			// 邀请
			invi () {
				
			},
			// 转让班级
			changeClass () {
				console.log(this.touchPersonal)
				self.getRequest('/class/user/role',{
					uid: this.touchPersonal.uid,
					role: 1,
					enable: true
				},(res) => {
					console.log(res)
					if (res.data.code === 200) {
						publicFun.note('转让成功',this)
						this.supers = false
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
					this.touchPersonal.left = 'left: 0rpx;'
				},(err) => {
					console.log(err)
				},'PUT')
			},
			// 移出班级
			moveOut () {
				console.log(this.touchPersonal.uid)
				self.getRequest('/class/user',{
					uid: this.touchPersonal.uid,
					
				},(res) => {
					console.log(res)
					if (res.data.code === 200) {
						publicFun.note('移出成功',this)
						this.outputData = []
						this.wordArr = []
						this.usersData = [
							{
								id: 'A',
								children: []
							},
							{
								id: 'B',
								children: []
							},
							{
								id: 'C',
								children: []
							},
							{
								id: 'D',
								children: []
							},
							{
								id: 'E',
								children: []
							},
							{
								id: 'F',
								children: []
							},
							{
								id: 'G',
								children: []
							},
							{
								id: 'H',
								children: []
							},
							{
								id: 'I',
								children: []
							},
							{
								id: 'J',
								children: []
							},
							{
								id: 'K',
								children: []
							},
							{
								id: 'L',
								children: []
							},
							{
								id: 'M',
								children: []
							},
							{
								id: 'N',
								children: []
							},
							{
								id: 'O',
								children: []
							},
							{
								id: 'P',
								children: []
							},
							{
								id: 'Q',
								children: []
							},
							{
								id: 'R',
								children: []
							},
							{
								id: 'S',
								children: []
							},
							{
								id: 'T',
								children: []
							},
							{
								id: 'U',
								children: []
							},
							{
								id: 'V',
								children: []
							},
							{
								id: 'W',
								children: []
							},
							{
								id: 'X',
								children: []
							},
							{
								id: 'Y',
								children: []
							},
							{
								id: 'Z',
								children: []
							},
							{
								id: '*',
								children: []
							},
						]
						self.getRequest('/class/users',{},(res) => {
							console.log(res)
							this.count = res.data.data.length
							for (var i = 0; i < res.data.data.length; i++) {
								let firts = this.getFirstWord(res.data.data[i].profile.name)
								let ifword = false
								let data = {}
								data.left = 'left:0rpx;'
								data.qq =  res.data.data[i].profile.qq
								data.wechat = res.data.data[i].profile.wechat
								data.uid = res.data.data[i].profile.uid
								data.name = res.data.data[i].profile.name
								data.img = res.data.data[i].profile.avatar
								data.phone = res.data.data[i].profile.phone
								for (var j = 0; j < this.usersData.length; j++) {
									if (firts === this.usersData[j].id) {
										ifword = true
										
										this.usersData[j].children.push(data)
									}
								}
								if (!ifword) {
									this.usersData[26].children.push(data)
								}
								
							}
							for (var i = 0;i < this.usersData.length; i++) {
								if (this.usersData[i].children.length > 0) {
									
									this.wordArr.push(this.usersData[i].id)
									this.outputData.push(this.usersData[i])
								}
							}
							
						},(err) => {
							console.log('err',err)
						})
					} else {
						publicFun.note(res.data.msg,this)
					}
					this.touchPersonal.left = 'left: 0rpx;'
				},(err) => {
					console.log(err)
				},'DELETE')
			},
			// touch start
			touchstart (e) {
				
				if (e.touches.length === 1) {
					this.startX = e.touches[0].pageX
				}
				
			},
			touchmove (e) {
				if (e.touches.length === 1  && this.supers) {
					
					if (this.touchPersonal != '') {
						this.touchPersonal.left = 'left: 0rpx;'
					}
					this.moveX = this.startX - e.touches[0].pageX 
					let parentIndex =  e.currentTarget.dataset.parent.charCodeAt() - 65
					let index = e.currentTarget.dataset.index
					let touch = this.usersData[parentIndex].children[index]
					this.touchPersonal = touch
					console.log(touch)
					if (touch.uid != this.personalId) {
						if (this.moveX === 0 || this.moveX < 0) {
							
							touch.left = 'left: 0rpx;'
						} else if (this.moveX > 0) {
							touch.left = 'left: -' + 200 + 'rpx;'
							
						}
					}
					
				}
			},
			// 点击字母跳转
			toLetter (letter) {
				this.letter = letter
			},
			 /**
			  *点击设置
			  */
			  changeSet () {
				  this.ifPopup = true
			    
			  },
			
			  /**
			  *关闭设置
			  */
			  closeSet () {
				  this.ifPopup = false
			   
			  },
			  /**
			  *改变是否加入
			  */ 
			  changeJoin () {
				  this.joinBg = !this.joinBg
		
			  },
			
			  /**
			  *改变是否被搜索
			  */
			  changesearch () {
				  
				  this.searchBg = !this.searchBg
			  
			  },
			  /**
			  *点击切换问题
			  */
			  choice (index) {
				  this.currentText = this.questionText[index]
				  this.queId = index 
				
			   
			  },
			
			  /**
			  *点击选择问题
			  */
			  selectQuestion () {
				 
				  this.questionListHeight = !this.questionListHeight
			  
			  },
			  // 获取通讯录名字第一个字母
			  getFirstWord (str) {
				 return pinyin.pinyinUtil.getFirstLetter(str).slice(0,1).toUpperCase()
			  },
			  // 保存设置
			  saveSet () {
					
				  let setData = {}
				  setData.visible = this.searchBg
				  setData.direct = this.joinBg
				  if (!this.joinBg) {
					  setData.question = this.queId + 1
					  setData.answer = this.answer
				  } 
				  
				  if (!this.joinBg && this.answer === '') {
					  publicFun.note('答案不能为空',this)
					 
				  } else {
					  self.getRequest('/class/profile',setData,(res) => {
						 
						  if (res.data.code === 200) {
							publicFun.note('设置成功',this)
							wx.setStorageSync('classJoinInfo',setData)
							   this.ifPopup = false
						  } else {
							  publicFun.note(res.data.msg,this)
							  
						  }
					  },(err) => {
						  console.log(err)
					  },'PUT','application/x-www-form-urlencoded')
				  }
			  }

		},
		
		onShareAppMessage (res) {
			console.log(res)
			if (res.from === 'button') {
			  // 来自页面内转发按钮
			  // uni.report('class_invivita','邀请加入班级')  
			  return {
			       title: '快来加入我的班级吧',
			       path: '/pages/index/index?share=true&code='+this.classCode + '&classId=' + this.classId
			   }
			  
			   
			}
		},
		mounted() {
			// console.log(wx.getStorageSync('classJoinInfo'))
			if (wx.getStorageSync('classJoinInfo') != '') {
				let joinInfo = wx.getStorageSync('classJoinInfo')
				// setData.visible = this.searchBg
				// setData.direct = this.joinBg
				this.searchBg = joinInfo.visible
				this.joinBg = joinInfo.direct
				if (!this.joinBg) {
					this.queId = joinInfo.question - 1
					
				}
				console.log(wx.getStorageSync('classJoinInfo'))
			}
			// 邀请码
			
			// 背景颜色
			if (wx.getStorageSync('bgColor') === 'code' ) {
				this.ifhot = false
			} else {
				this.ifhot = true
			}
			this.supers = getApp().globalData.personal.permission.super
			this.personalId = getApp().globalData.personal.uid
			this.classId = getApp().globalData.personal.class.id
			
			if (this.supers) {
				self.getRequest('/class/invitation',{
					id:this.classId
				},(res) => {
					  
					  if (res.data.code === 200) {
						  this.classCode = res.data.data.code
					  } else {
						  publicFun.note('获取邀请码失败',this)
					  }
				},(err) => {
					console.log(err)
				},'POST')
			}
			
			
			this.currentText = this.questionText[0]
			self.getRequest('/class/users',{},(res) => {
				
				this.count = res.data.data.length
				for (var i = 0; i < res.data.data.length; i++) {
					let firts = this.getFirstWord(res.data.data[i].profile.name)
					let ifword = false
					let data = {}
					data.left = 'left:0rpx;'
					data.qq =  res.data.data[i].profile.qq
					data.wechat = res.data.data[i].profile.wechat
					data.uid = res.data.data[i].profile.uid
					data.name = res.data.data[i].profile.name
					data.img = res.data.data[i].profile.avatar
					data.phone = res.data.data[i].profile.phone
					for (var j = 0; j < this.usersData.length; j++) {
						if (firts === this.usersData[j].id) {
							ifword = true
							
							this.usersData[j].children.push(data)
						}
					}
					if (!ifword) {
						this.usersData[26].children.push(data)
					}
					
				}
				for (var i = 0;i < this.usersData.length; i++) {
					if (this.usersData[i].children.length > 0) {
						
						this.wordArr.push(this.usersData[i].id)
						this.outputData.push(this.usersData[i])
					}
				}
				
			},(err) => {
				console.log('err',err)
			})
		}
	}
</script>

<style>
/* pages/addressList/addressList.wxss */
.activeInfo{
	padding: 20rpx 0;
}
.iconOn{
	background-color: #98ba9a;
}
.iconOff{
	background-color: #e5e5e5;
}
.iconLeft{
	left: 29rpx;
}
.iconRight{
	left: 6rpx;
}
.iconstart{
	transform: rotate(0deg);
	
}
.icondown{
	transform: rotate(180deg);
	
}
.body{
	position: relative;
	z-index: 100;

}
.boxStartH{
	height: 0;
}
	
.boxEndH{
	height: 242rpx;
}
/*搜索框*/
.searchBox{
	display: flex;
	justify-content: center;
	
	margin-top: 30rpx;
}
.search{
	position: relative;
	width: 643rpx;
	height: 56rpx;
}
.search>input{
	width: 533rpx;
	height: 56rpx;
	border-radius: 15px;
	padding-left: 30rpx;
	margin-top: 1rpx;
	padding-right: 80rpx;
	font-size: 26rpx;
	background: #e6e6e6;
}
.search> icon{
	position: absolute;
	right: 25rpx;
	top: 10rpx;

}
/* 搜索结束 */
/*背景开始*/
.bg{
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
.bgCover{
	height: 100vh;
	width: 100vw;
	background: rgba(255,255,255,0.3);
	position: absolute;
	top: 0;
	z-index: 15;
}
/*背景结束*/
/*标题开始*/
.titleBox{
	display: flex;
	justify-content: space-between;
	margin-top: 45rpx;
	margin-bottom: 50rpx;
}
.title{
	letter-spacing: 10rpx;
	font-size: 40rpx;
	margin-left: 92rpx;
}
.titleBoxRight{
	margin-right: 60rpx;
	display: inline-flex;
	font-size: 30rpx;
	vertical-align: top;
}
.invi::after{
	width: 0;
	height: 0;
}
button::after{
	width: 0;
	height: 0;
}
.invi{
	padding: 0;
	margin: 0;
	font-size: 30rpx;
	line-height: normal;
	border: none;
	margin-right: 30rpx;
	background-color: inherit;
	position: inherit;
}

.iconshezhi{
	font-size: 32rpx;
	margin-left: 20rpx;
}

/*标题结束*/
/*通讯录开始*/
.addressBock{
	display: flex;
	justify-content: center;
}
.letter{
	width: 28rpx;
	height: 100rpx;
	font-size: 22rpx;
	margin-right: 15rpx;
	padding-top: 10rpx;
	flex-shrink: 0;
}
.letterBox{
	display: flex;
	
}
.addressScroll,
.letter{
	background: #98ba9a;
	color: #fff;
	text-align: center;
	border-radius: 3px;
}
.addressScroll{
	width: 35rpx;
	font-size: 30rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 10rpx 0;
}
.personalImg{
	flex-shrink: 0;
	width: 110rpx;
	height: 110rpx;
	border-radius: 5px;
	margin-right: 35rpx;
}
.itemBox{
	overflow: hidden;
	width: 608rpx;
}
.personalInfoBox{
	display: inline-flex;
	
}
.changeBox{
	display: inline-flex;
	width: 200rpx;
	align-items: center;
	justify-content: space-around;
}
.infoBox{
	flex-shrink: 0;
}

.item{
	display: flex;
	height: 117rpx;
	border-bottom: 1rpx solid #c8c8c8;
	width: 808rpx;
	justify-content: space-between;
	font-size: 38rpx;
	margin-right: 10rpx;
	margin-bottom: 25rpx;
	position: relative;
	transition: 0.2s all linear;
}
.item>view{
	flex-shrink: 0;
}

.phone{
	margin-top: 18rpx;
}

.address{
	
	width: 88vw;
	height: 83vh;
	/* height: 78vh; */
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
/*通讯录结束*/
.count{
	letter-spacing: 2rpx;
	font-size: 24rpx;
	text-align: center;
	margin-top: 10rpx;
}
/* 信息弹窗 */

/*弹窗开始*/
.popupBox,
.userInfo{
	width: 100vw;
	height: 100vh;
	background: rgba(0,0,0,0.4);
	position: absolute;
	top: 0;
	z-index: 100000;
	display: flex;
	justify-content: center;
	align-items: center;
}
.popupSet,
.userInfoBox{
	width: 600rpx;
	background: #fff;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.triangle{
	width: 0rpx;
	height: 0rpx;
	border-width:  18rpx 18rpx 0;
	border-style: solid;
	border-color: #7d7d7d transparent transparent  ;
	display: inline-flex;
	position: absolute;
	right: 20rpx;
	top: 20rpx;
	transition: all 0.5s;
}
.popupTitleBox{
	margin-top: 65rpx;
}
.allowSearch{
	margin-top: 40rpx;
}
.allowJoin{
	margin-top: 30rpx;
}
.questionTitle{
	margin-top: 30rpx;
}
.question,
.answer{
	margin-top: 15rpx;
}
.answerTitle{
	margin-top: 20rpx;
}
.activeName{
	margin-top: 30rpx;
}
.activeQQ{
	margin-bottom: 30rpx;
}
.popupTitleBox,
.allowSearch,
.allowJoin,
.questionTitle,
.answerTitle,
.activeInfo{
	width: 470rpx;
	display: flex;
	justify-content: space-between;
}
.popupTitle{
	font-size: 36rpx;
	letter-spacing: 5rpx;
}
.switch{
	width: 60rpx;
	height: 36rpx;

	border-radius: 27rpx;
	position: relative;
}
.switch>view{
	width: 27rpx;
	height: 27rpx;
	border-radius: 50%;
	background: #fff;
	position: absolute;

	transition: all 0.2s;

	top: 4rpx;
}
.allowSearch,
.allowJoin{
	font-size: 30rpx;
}
.questionTitle,
.answerTitle,
.question,
.answer{
	font-size: 24rpx;
	
}
.question{
	width: 400rpx;
	line-height: 60rpx;
	position: relative;
	padding-right: 60rpx;

}
.questionList{
	position: absolute;
	top: 60rpx;
	background: #fff;
	border-bottom-left-radius: 10rpx;
	border-bottom-right-radius: 10rpx;
	z-index: 100001;
	box-shadow: 0rpx 5rpx 10rpx 0rpx #ccc;
	width: 460rpx;
	padding-left: 20rpx;
	left: 0;
	overflow: hidden;
	transition: height 0.5s;
}
.answer,
.question{

	height: 60rpx;
	background: #e5e5e5;
	border-radius: 10px;
	padding-left: 20rpx;
}
.answer{
	width: 460rpx;
}
.saveSetting{
	margin-top: 42rpx;
	width: 280rpx;
	height: 60rpx;
	border-radius: 5px;
	background-color: #98ba9a;
	color: #fff;
	text-align: center;
	line-height: 60rpx;
	margin-bottom: 65rpx;
}
/*弹窗结束*/
</style>

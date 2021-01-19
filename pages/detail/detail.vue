<template>
	<view class="detailContent" >
		<!-- top start -->

			<!-- 背景 -->
			<view class="headBg">
				<view class="bg_1 bg" :class="[animation_1,ifhot ? 'hotBg' : 'codeBg']"></view>
				<view class="bg_2 bg" :class="[animation_2,ifhot ? 'hotBg' : 'codeBg']"></view>
				<view class="bg_3 bg" :class="[animation_3,ifhot ? 'hotBg' : 'codeBg']"></view>
				<view class="bg_4 bg" :class="[animation_4,ifhot ? 'hotBg' : 'codeBg']"></view>
			</view>
			<!-- 内容 -->
			<view class="headText" @touchstart="changePageStart" @touchmove="changePageMove">
				<view class="headDate" @click="openCancel">
					<view class="headDay">{{ nowDianai.date }}</view>
					<view class="headMonth">{{ nowDianai.mon }}</view>
				</view>
				
				<view class="textData" :class="contentAni_new" v-if="toNext">
					<view class="iconfont iconquotation"></view>
					<view class="detail" v-if="!ifedit">
						{{ nowDianai.diandi.content }}
					</view>
					<textarea v-if="ifedit" class="detail" v-model="nowDianai.diandi.content"></textarea>
				</view>
				<view class="textData" :class="contentAni" v-if="out">
					<view class="iconfont iconquotation"></view>
					<view class="detail" v-if="!ifedit">
						{{ nowDianai.diandi.content }}
					</view>
					<textarea v-if="ifedit" class="detail" v-model="nowDianai.diandi.content"></textarea>
				</view>
			</view>
		
		<!-- top end -->
		<!-- content start -->
	
			<view class="contentTitle" @touchstart="changePageStart" @touchmove="changePageMove">瞬间</view>
			<view class="contentBody">
				<view class="contentImg">
					 <!--  -->
					<scroll-view class="longImgBox" scroll-x="true" enable-flex="true"  :scroll-into-view="toId"  :scroll-left="scrollLeft" scroll-with-animation="true">
						<view v-if="item" v-for="(item,index) in nowDianai.imgList" :key="index" class="imgBox" :id="'img_'+index">
							<image class="diandiImg" ref="diandiImg" :src="item" @click="preview(item)"></image>
							<view class="deleteImg " v-if="ifedit" @click="deleteImg(index)"> 
								<text class="iconfont iconlajitong imgLaji"></text>
							</view>
						</view>
						<view class="addImgBox" v-if="ifedit" id="add" @click="addImg">
							<view >
								<view class="iconfont iconguanbi add"></view>
								<view class="tianjia">添加图片</view>
							</view>
						</view>
						
						<view  class="nullImg">
							
							<view >
								<view class="iconfont iconempty"></view>
								<view>暂无图片</view>
							</view>
						</view>
					</scroll-view>
					
				</view>
				<view class="contentBg" :class="[ifhot ? 'hot' : 'cool']" @touchstart="changePageStart" @touchmove="changePageMove">
					<view class="contentBgIcon">
						<view class="iconfont iconfanhui pre" @click="preImg"  :class="{footImg: ifHead,notFoot: !ifHead}"></view>
						<view class="nextBox" @touchstart='touchstartImg' @touchend='touchendImg' @click="nextImg" @longtap="longtap" :class="{footImg: ifFoot,notFoot: !ifFoot}">
							next
							<text class="iconfont iconfanhui next"></text>
						</view>
						
				
					</view>
				</view>
			</view>
			<view class="iconBox" @touchstart="changePageStart" @touchmove="changePageMove">
				<view > 
					
					<text class="iconfont iconlajitong deleteDD" @click="deleteDiandi" v-if="ifadd === 'true' && !ifedit"></text>
					
					<text class="iconfont iconbianji" @click="edit" v-if="!ifedit && ifadd === 'true'" ></text>
					<text class="confirmChange" v-if="ifedit" @click="confirmChange">确认</text>
					
					<!-- 删除时的提示 -->
					<uni-popup ref="popupDialog" type="dialog">
						<uni-popup-dialog type="info" title=" "  content="是否删除该点滴？" :before-close="false" @confirm="dialogConfirm"></uni-popup-dialog>
					</uni-popup>
					<!-- 保存 -->
					<uni-popup ref="popupDialogSave" type="dialog">
						<uni-popup-dialog type="info" title=" "  content="是否保存修改内容？" :before-close="false" @confirm="confirmSave"></uni-popup-dialog>
					</uni-popup>
					
					
				</view>
				<view v-if="ifedit" @click="cancelChange">取消</view>
			</view>
		
		<!-- content end -->

		<!-- calendar -->
		<uni-calendar
			ref="calendar"
		    :insert="false"
		    :lunar="true" 
		    @confirm="change"
		     ></uni-calendar>
		<!-- 删除图片提示框 -->
		<uni-popup ref="deleteImg" type="dialog">
			<uni-popup-dialog type="info" title=" "  content="是否删除该图片？" :before-close="false" @confirm="confirmDeleteImg"></uni-popup-dialog>
		</uni-popup>
		<popup v-if="ifNote" :infoData="noteData"></popup>
	</view>
</template>

<script>
	import self from '../../static/request.js'
	import popup from '@/components/Popup.vue'
	import publicFun from '@/static/public.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniPopup,
			uniPopupDialog,
			uniCalendar,
			popup
		},
		data() {
			return {
				touchT: '',
				touchE: '',
				ifHead: true,
				ifFoot: false,
				ifNote: false,
				noteData: '',
				diandi: '',
				imgList: [],
				data: '',
				date: '',
				mon: '',
				ifedit: false,
				toId: '',
				returnTime: '',
				imgIndex: '',
				token: '',
				ifNullImg: false,
				ifadd: 'true',
				startX: '',
				startY: '',
				animation_1: '',
				animation_2: '',
				animation_3: '',
				animation_4: '',
				contentAni: '',
				contentAni_new: '',
				toNext: false,
				out: true,
				nowDianai: '',
				
				nowIndedx: '',
				page: '',
				allData: '',
				lock: true,
				idList:[],
				ifhot: true,
				firstImg: 0,
				startscroll:'',
				
			}
		},
		methods: {
			// 上一张图片
			preImg () {
				if (this.touchE - this.touchT < 350) { 
					if (this.firstImg > 0) {
						
						this.firstImg--
						this.toId = 'img_' + this.firstImg
						
					} 
					if (this.firstImg === this.nowDianai.imgList.length-1) {
						this.ifFoot = true
						
					} else {
						this.ifFoot = false
					}
					if (this.firstImg === 0) {
						this.ifHead = true
					} else {
						this.ifHead = false
					}
				}
				
			},
			
			touchstartImg () {
				this.touchT = new Date().getTime()
				
				// this.startscroll = setInterval(() => {
				// 	// console.log(new Date().getTime())
				// 	if (new Date().getTime() - this.touchT > 350) {
				// 		// startscroll.clearInterval()
				// 		if (this.firstImg < this.nowDianai.imgList.length-1) {
				// 			console.log(this.firstImg)
				// 			this.firstImg++
				// 			this.toId = 'img_' + this.firstImg
							
				// 		}
				// 		console.log('go')
				// 	}
				// },100)
			},
			touchendImg () {
				
				this.touchE = new Date().getTime()
			},
			// 下一张图片
			nextImg () {
				if (this.touchE - this.touchT < 350) {
					if (this.firstImg < this.nowDianai.imgList.length-1) {
						
						this.firstImg++
						this.toId = 'img_' + this.firstImg
						
					} 
					
					if (this.firstImg === this.nowDianai.imgList.length-1) {
						this.ifFoot = true
						
					} else {
						this.ifFoot = false
					}
					if (this.firstImg === 0) {
						this.ifHead = true
					} else {
						this.ifHead = false
					}
				}
				
				
			},
			// 预览
			preview (item) {
				console.log('img',item)
				wx.previewImage({
					current: item,
					urls: this.nowDianai.imgList
				})
			},
			/**
			*滑动开始
			*/
			changePageStart: function (e) {
			  this.startX = e.touches[0].pageX
			  this.startY = e.touches[0].pageY
			},
			// 滑动
			changePageMove: function (e) {
				// 触碰屏幕时的位置
				var currentX = e.touches[0].pageX
				var currentY = e.touches[0].pageY
				var moveX = currentX - this.startX
				var moveY = currentY - this.startY
				
				// 左右滑动
				if (Math.abs(moveY) < Math.abs(moveX) && this.lock) {
					this.lock = false
					
					if (moveX > 0) {
						// 上一条
						
						if (this.page === 1 && this.nowIndedx === 0) {
							
							publicFun.note('当前已是最新点滴',this)
							this.lock = true
							
							
						} else if (this.nowIndedx === 0) {
							
							this.page--
							this.nowIndedx = 9
							wx.showLoading({
								title: '正在加载数据...',
								mask: true,
							})
							if (this.data.type === '个人点滴') {
								self.getRequest('/personal/essays',{
									tag: this.data.diandiType,
									page: this.page
								},(res) => {
									
									if (res.data.code === 200) {
										let ids = []
										for (var i = 0; i < res.data.data.length; i++) {
											ids.push(res.data.data[i].id)
										}
										this.idList = ids
										this.changPre()
										
										this.getDataFun('/personal/essay',this.idList[this.nowIndedx],'nowDianai')
									} else {
										publicFun.note('无法获取数据',this)
										
									}
									
								},(err) => {
									console.log(err)
								},'GET')
								
								
							} else {
								// 班级点滴
								self.getRequest('/class/essays',{
									page: this.page
								},(res) => {
									if (res.data.code === 200) {
										
										let ids = []
										for (var i = 0; i < res.data.data.length; i++) {
											ids.push(res.data.data[i].id)
										}
										this.idList = ids
										this.changPre()
										this.getDataFun('/class/essay',this.idList[this.nowIndedx],'nowDianai')
									} else {
										publicFun.note('无法获取数据',this)
										
									}
								},(err) => {
									console.log(err)
								})
							}
						} else {
						
							this.nowIndedx--
							this.changPre()
							if (this.data.type === '个人点滴') {
								this.getDataFun('/personal/essay',this.idList[this.nowIndedx],'nowDianai')
							} else {
								this.getDataFun('/class/essay',this.idList[this.nowIndedx],'nowDianai')
							}
						}
						
						
						
					} else {
						// 下一条
						
						if (this.idList.length < 10 && this.nowIndedx === this.idList.length - 1) {
							
							publicFun.note('当前已是最后一条点滴',this)
							this.lock = true
							
						} else if (this.nowIndedx === this.idList.length - 1) {
							
							this.page++
							this.nowIndedx = 0
							wx.showLoading({
								title: '正在加载数据...',
								mask: true,
							})
							if (this.data.type === '个人点滴') {
								self.getRequest('/personal/essays',{
									tag: this.data.diandiType,
									page: this.page
								},(res) => {
									
									if (res.data.code === 200) {
									
										if (res.data.data.length === 0) {
											wx.hideLoading()
											publicFun.note('当前已是最后一条点滴',this)
											this.lock = true
											
										} else {
											let ids = []
											for (var i = 0; i < res.data.data.length; i++) {
												ids.push(res.data.data[i].id)
											}
											this.idList = ids
											this.changeNext()
											this.getDataFun('/personal/essay',this.idList[this.nowIndedx],'nowDianai')
											// 当前的点滴
											
										}
										
										
									} else {
										publicFun.note('无法获取数据',this)
										
									}
									
								},(err) => {
									console.log(err)
								},'GET')
	
							} else {
								// 班级点滴
								self.getRequest('/class/essays',{
									page: this.page
								},(res) => {
									if (res.data.code === 200) {
										this.allData = res.data.data
										if (res.data.data.length === 0) {
											wx.hideLoading()
											publicFun.note('当前已是最后一条点滴',this)
											this.lock = true
											
										} else {
											let ids = []
											for (var i = 0; i < res.data.data.length; i++) {
												ids.push(res.data.data[i].id)
											}
											this.changeNext()
											this.idList = ids
											this.getDataFun('/class/essay',this.idList[this.nowIndedx],'nowDianai')
											// 当前的点滴
											// this.getDataFun('/personal/essay',this.allData[this.nowIndedx].id,'nowDianai')
										} 
									} else {
										publicFun.note('无法获取数据',this)
										
									}
								},(err) => {
									console.log(err)
								})
							
								
							}
						} else {
							this.nowIndedx++
							this.changeNext()
							if (this.data.type === '个人点滴') {
								this.getDataFun('/personal/essay',this.idList[this.nowIndedx],'nowDianai')
							} else {
								this.getDataFun('/class/essay',this.idList[this.nowIndedx],'nowDianai')
							}
						}
						
					}
				}
			},
			// 上一条动画
			changPre () {
				this.animation_1 = 'toTwo'
				this.animation_2 = 'toThree'
				this.animation_3 = 'toFour'
				this.animation_4 = 'toFive'
				this.contentAni = 'preOut'
				this.contentAni_new = 'preCome'
				this.toNext = true
				setTimeout(() => {
					this.animation_1 = ''
					this.animation_2 = ''
					this.animation_3 = ''
					this.animation_4 = ''
					this.contentAni = ''
					this.contentAni_new = ''
					this.out = false
				},1000)
				
				setTimeout(() => {
					this.out = true
					this.toNext = false
					this.lock = true
				},1100)
			},
			// 下一条动画
			changeNext () {
				this.animation_1 = 'toTwo'
				this.animation_2 = 'toThree'
				this.animation_3 = 'toFour'
				this.animation_4 = 'toFive'
				this.contentAni = 'out'
				this.contentAni_new = 'come'
				this.toNext = true
				setTimeout(() => {
					this.animation_1 = ''
					this.animation_2 = ''
					this.animation_3 = ''
					this.animation_4 = ''
					this.contentAni = ''
					this.contentAni_new = ''
					
				},1000)
				setTimeout(() => {
					this.out = false
				},750)
				setTimeout(() => {
					this.out = true
					this.toNext = false
					this.lock = true
				},1100)
			},
			// 点击删除
			deleteDiandi () {
				this.$refs.popupDialog.open()
			},
			// 点击修改
			confirmChange () {
				this.$refs.popupDialogSave.open()
				
			},
			// 取消修改
			cancelChange () {
				this.ifedit = false
			},
			// 确认修改
			confirmSave (done) 
			{	
				let linkStr = ''
				for (var i = 0; i < this.nowDianai.imgList.length; i++) {
					linkStr = linkStr + this.nowDianai.imgList[i] + ';'
				}
				
			
				this.ifedit = false
				if (this.data.type === '个人点滴') {
					
					self.getRequest('/personal/essay',{
						id: parseInt(this.data.id),
						writed_at: this.nowDianai.returnTime,
						tag: parseInt(this.data.tag),
						content: this.nowDianai.diandi.content,
						image: linkStr
					},(res) => {
						this.lock = false
						
						if (res.data.code === 200) {
							publicFun.note('修改成功',this)
							
						} else {
							publicFun.note(res.data.msg,this)
							
						}
					},(err) => {
						console.log(err)
					},'PUT','application/x-www-form-urlencoded')
					
				} else {
					
					
					self.getRequest('/class/essay',{
						id: parseInt(this.data.id),
						classid: parseInt(this.data.classid),
						writed_at: this.nowDianai.returnTime,
						content: this.nowDianai.diandi.content,
						image: linkStr
					},(res) => {
						
						if (res.data.code === 200) {
							publicFun.note('修改成功',this)
							
						} else {
							publicFun.note(res.data.msg,this)
							
						}
					},(err) => {
						console.log(err)
					},'PUT','application/x-www-form-urlencoded')
					
				}
				
				done()
			},
			//打开日历
			openCancel(){
				if (this.ifedit) {
					this.$refs.calendar.open()
				}
			},
			// 删除请求
			deleteFun (url) {
				self.getRequest(url,{
					id: parseInt(this.data.id)
				},(res) => {
				
					if (res.data.code === 200 && res.data.msg === "ok") {
						publicFun.note('删除成功',this)
						
						setTimeout(() => {
							
							uni.navigateBack()
						},1500)
					} else {
						publicFun.note(res.data.msg)
						
					}
				},(err) => {
					console.log(err)
					
				},'DELETE')
			},
			// 请求数据
			getDataFun (url,id,name) {
				
				self.getRequest(url,{
					id: id
				},(res) => {
				
					console.log(res)
					if (res.data.code === 200) {
						wx.hideLoading()
						
						let returnData = {}
						// 修改时 如果没有改变时间则返回这个时间
						returnData.returnTime = `${res.data.data.writed_at.split('T')[0]} ${res.data.data.writed_at.split('T')[1].split('+')[0]}`
						// 点滴的数据
						returnData.diandi = res.data.data
						// 日期
						returnData.date = publicFun.getDay(res.data.data.writed_at).day
						// 月份
						returnData.mon = publicFun.getDay(res.data.data.writed_at).mon
						// 图片列表
						returnData.imgList = res.data.data.image.split(';')
						if (res.data.data.image.split(';')[res.data.data.image.split(';').length-1] === ''){
							returnData.imgList.pop()
						}
						
						
						// for (var i = 0;i < returnData.imgList.length;i++) {
							
						// 	returnData.imgList[i] = returnData.imgList[i].split(':')[0] + ':/' + returnData.imgList[i].split(':')[1]
						// }
					
						this[name] = returnData
					} else {
						publicFun.note(res.data.msg,this)
						
						setTimeout(() => {
							
							uni.navigateBack()
						},1500)
					}
				},(err) => {
					console.log(err)
				},'GET')
			},
			// 确认删除
			dialogConfirm (done) {
				
				
				if (this.data.type === '个人点滴') {
					this.deleteFun('/personal/essay')
					
				} else {
					this.deleteFun('/class/essay')
					
				}
				
				done()
				
			},
			// 编辑信息
			edit () {
				this.ifedit = true
				this.toId = 'add'
				this.lock = false
			},
			// 添加图片
			addImg () {
				wx.chooseImage({
				   count: 9,
				   sizeType: ['original', 'compressed'],
				   sourceType: ['album', 'camera'],
				   success: (res) => {
					  
				     // tempFilePath可以作为img标签的src属性显示图片
				     const tempFilePaths = res.tempFilePaths
					 this.upload(0,0,0,tempFilePaths.length,tempFilePaths)
					 
					 
				   }
				})
			},
			//上传图片
			upload (lens,successs,fails,maxlen,path) {
				
				 let _this = this
				wx.showLoading({
					title: '上传中...',
					mask: true,
				})
				let len = lens,
					success = successs,
					fail = fails
				 wx.uploadFile({
					url: 'https://wy.lujiahaoo.cn/dddx/api/upload/image',
					filePath: path[len],
					name: 'image',
					header: {
						'content-type': 'application/json',
						'Authorization' : 'Bearer ' + this.token
					},
					success: res => {
						wx.hideLoading()
						success++
						
						let data = JSON.parse(res.data)
						
						if (data.code === 200) {
							
							
				
							this.nowDianai.imgList.push(data.data[0])
							
						
						}
					},
					fail: err => {
						fail++
					
					},
					complete: () => {
						len++
						if (len === maxlen) {
							this.ifNullImg = false
						} else {
							
							_this.upload(len,success,fail,maxlen,path)
						}
					}
				 })
			},
			// 点击删除图片
			deleteImg (index) {
				
				this.$refs.deleteImg.open()
				this.imgIndex = index
			},
			// 确认删除图片
			confirmDeleteImg (done) {
				
				this.nowDianai.imgList.splice(this.imgIndex,1)
				
				publicFun.note('删除成功',this)
				
				done()
			},
			// 选择日期
			change(e) {
				
				let data = new Date()
				let hour = data.getHours()
				let min = data.getMinutes()
				let sec = data.getSeconds()
				this.nowDianai.date = publicFun.timeModel(e.date)
				this.nowDianai.mon = publicFun.month(e.month)
				
				this.nowDianai.returnTime = `${e.fulldate} ${publicFun.timeModel(hour)}:${publicFun.timeModel(min)}:${publicFun.timeModel(sec)}`
				
			},
			
		},
		mounted() {
			if (wx.getStorageSync('bgColor') === 'code' ) {
				this.ifhot = false
			} else {
				this.ifhot = true
			}
			this.token = wx.getStorageSync('token')
			
			
			
		},
		onLoad(option) {
			
			// 从点滴列表传进来的数据
			this.data = option
			
			wx.showLoading({
				title: '正在加载数据',
				mask: true,
			})
			option.id = parseInt(option.id)
			// 当前的数据在总数据的第几页
			this.page = parseInt(option.page)
			// 处于两页拼接的时候
			
			
			
			
			if (this.data.type === '个人点滴') {
				// 个人点滴
				// 当前的点滴
				this.getDataFun('/personal/essay',option.id,'nowDianai')
				
				self.getRequest('/personal/essays',{
					tag: option.diandiType,
					page: this.page
				},(res) => {
					
					
					if (res.data.code === 200) {
						this.nowIndedx = -1
						let ids = []
						for (var i = 0; i <res.data.data.length; i++) {
							
							if (res.data.data[i].id === option.id) {
								this.nowIndedx = i
							}
							ids.push(res.data.data[i].id)
						}
						if (this.nowIndedx === -1) {
							let ids = []
							this.page++
							self.getRequest('/personal/essays',{
								tag: option.diandiType,
								page: this.page
							},(res) => {
								for (var i = 0; i <res.data.data.length; i++) {
									if (res.data.data[i].id === option.id) {
										this.nowIndedx = i
									}
									ids.push(res.data.data[i].id)
								}
								this.idList = ids
								
							},(err) => {},'GET')
						} else {
							this.idList = ids
							
						}
						
						
						
					} else {
						wx.hideLoading()
						publicFun.note('无法获取数据',this)
						
					}
						
				},(err) => {
					console.log(err)
				},'GET')
				
			} else {
				// 班级点滴
				this.getDataFun('/class/essay',option.id,'nowDianai')
				this.ifadd = this.data.ifadd
				
				self.getRequest('/class/essays',{
					page: this.page
				},(res) => {
					if (res.data.code === 200) {
						this.nowIndedx = -1
						let ids = []
						for (var i = 0; i <res.data.data.length; i++) {
							
							if (res.data.data[i].id === option.id) {
								this.nowIndedx = i
							}
							ids.push(res.data.data[i].id)
						}
						if (this.nowIndedx === -1) {
							let ids = []
							this.page++
							self.getRequest('/personal/essays',{
								tag: option.diandiType,
								page: this.page
							},(res) => {
								for (var i = 0; i <res.data.data.length; i++) {
									if (res.data.data[i].id === option.id) {
										this.nowIndedx = i
									}
									ids.push(res.data.data[i].id)
								}
								this.idList = ids
								
							},(err) => {},'GET')
						} else {
							this.idList = ids
							
						}
						
						
					} else {
						wx.hideLoading()
						publicFun.note('无法获取数据',this)
						
					}
				},(err) => {
					console.log(err)
				},'GET')
				
			}
			
			
 		},
		watch: {
			nowDianai () {
				
				if (this.nowDianai.imgList.length === 0 || this.nowDianai.imgList === '' || this.nowDianai.imgList === []) {
					this.ifNullImg = true
				} else {
					this.ifNullImg = false
				}
				
			},
			
			// data.
			
		}
	}
</script>

<style>
/* head start */
.detailContent{
	display: flex;
	flex-direction: column;
	align-items: center;
	
}
.head{
	width: 70vw;
	
}
.headBg {
	position: relative;
	width: 100%;
}
.bg{
	width: 630rpx;
	height: 630rpx;
	
	position: absolute;
	left: 180rpx;
	top: 70rpx;
	
	
}
.hotBg{
	background-image: -moz-linear-gradient( 90deg, rgb(248,220,164) 0%, rgb(250,208,196) 100%);
	background-image: -webkit-linear-gradient( 90deg, rgb(248,220,164) 0%, rgb(250,208,196) 100%);
	background-image: -ms-linear-gradient( 90deg, rgb(248,220,164) 0%, rgb(250,208,196) 100%);
}
.codeBg{
	background-image: -moz-linear-gradient( 0deg, rgb(194,233,251) 0%, rgb(161,196,253) 98%);
	background-image: -webkit-linear-gradient( 0deg, rgb(194,233,251) 0%, rgb(161,196,253) 98%);
	background-image: -ms-linear-gradient( 0deg, rgb(194,233,251) 0%, rgb(161,196,253) 98%);
}
.bg_1{
	z-index: -1;
	transform: rotate(50deg);
	
}
.bg_2{
	z-index: -2;
	transform: rotate(60deg);
	opacity: 0.8;
}
.bg_3{
	z-index: -3;
	transform: rotate(70deg);
	
	opacity: 0.6;
}
.bg_4{
	z-index: -4;
	transform: rotate(80deg);
	
	opacity: 0.4;
}
@keyframes toTwo{
	from{
		transform: rotate(50deg);
	}
	to{
		transform: rotate(56deg);
	}
}
@keyframes toThree{
	from{
		transform: rotate(60deg);
	}
	to{
		transform: rotate(66deg);
	}
}
@keyframes toFour{
	from{
		transform: rotate(70deg);
	}
	to{
		transform: rotate(76deg);
	}
}
@keyframes toFive{
	from{
		transform: rotate(80deg);
	}
	to{
		transform: rotate(86deg);
	}
}
@keyframes out{
	from{
		transform: rotate(0deg);
		left: 0;
	}
	to{
		transform: rotate(85deg);
		left: -200rpx;
	}
}
@keyframes come{
	from{
		left: 1000rpx;
		top: 500rpx;
		transform: rotate(-90deg);
	}
	to{
		left: 0rpx;
		top: 0;
		transform: rotate(0deg);
	}
}
@keyframes preCome{
	from{
		transform: rotate(85deg);
		left: -200rpx;
	}
	to{
		transform: rotate(0deg);
		left: 0;
		
	}
}
@keyframes preOut{
	from{
		left: 0rpx;
		top: 0;
		transform: rotate(0deg);
		
	}
	to{
		left: 1000rpx;
		top: 500rpx;
		transform: rotate(-90deg);
	}
}
.preCome{
	transform-origin: left top;
	animation: 0.8s preCome ease;
}
.preOut{
	transform-origin: left top;
	animation: 1s preOut ease;
}
.come{
	transform-origin: left top;
	animation: 1s come ease;
}
.out{
	transform-origin: left top;
	animation: 0.8s out ease;
}
.toTwo{
	animation: 0.35s toTwo   ease 0.3s 2 alternate;
}
.toThree{
	animation: 0.35s toThree  ease 0.2s 2 alternate;
}
.toFour{
	animation: 0.35s toFour   ease 0.1s 2 alternate;
}
.toFive{
	animation: 0.35s toFive   ease 2 alternate;
}
.headText{
	/* width: 485rpx; */
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	height: 46vh;
}
.detail{
	
	width: 61vw;
	line-height: 50rpx;
	margin-top: 20rpx;
	max-height: 25vh;
	overflow-y: auto;
}
.textData{
	margin-top: -20rpx;
	position: relative;
}
.headDay,
.headMonth{
	-webkit-text-stroke:1rpx #000;
	color: transparent;
}
.headDay{
	font-size: 105rpx;
}
.headMonth{
	font-size: 65rpx;
}
.iconquotation{
	color: #FFFFFF
}.headDate{
	margin-top: 20rpx;
	margin-right: 48rpx;
}
/* head end */
/* content start */
.content{
	margin-top: 50rpx;
}
.contentTitle{
	font-size: 38rpx;
	letter-spacing: 10rpx;
	text-align: center;
	height: 6vh;
	line-height: 6vh;
	margin-bottom: 15rpx;
}
.contentBody{
	width: 70vw;
	
	position: relative;
	height: 41vh;
}
.contentImg{
	overflow: hidden;
	width: 100%;
	position: relative;
	z-index: 2;
}
.longImgBox{
	white-space: nowrap;
	
	height: 25vh;
	
}
.imgBox{
	
}
.addImgBox,
.diandiImg,
.nullImg{
	height: 25vh;
	width: 40vw;
	
	border-radius: 10px;
	margin-right: 20rpx;
	display: inline-block;
}
.add{
	transform: rotate(45deg);
	font-size: 80rpx;
	font-weight: 100;
}
.iconempty{
	font-size: 90rpx;
	margin-bottom: 15rpx;
}
.addImgBox,
.nullImg{
	
	background-color: #fff;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	vertical-align: top;
}
.nullImg{
	border: 1px solid #ccc;
	background-color: rgba(255,255,255,0.8);
}
.nullImg view {
	letter-spacing: 5rpx;
	text-align: center;
}
.addImgBox>view{
	text-align: center;
}

.tianjia{
	letter-spacing: 5rpx;
	margin-top: 30rpx;
	font-size: 32rpx;
}
.contentBg{
	width: 40vw;
	margin-top: 25vh;
	height: 3.3vh;

	border-bottom-left-radius: 5px;
	position: absolute;
	z-index: 1;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 2vh 3vw;
}
.iconBox{
	height: 6vh;
	display: flex;
	justify-content: space-between;
	width: 80vw;
}
.contentBgIcon{
	display: flex;
	justify-content: space-between;
	
}
.nextBox{
	
	font-size: 45rpx;
}
.next{
	transform: rotate(180deg);
	display: inline-block;
	font-size: 50rpx;
	margin-left: 10rpx;
	margin-top: 3rpx;
}
.footImg{
	color: #8e8e8e;
}
.notFoot{
	color: #fff;
}
.pre{
	font-size: 40rpx;
	margin-top: 15rpx;
	
}
/* content end */


.iconupload,
.deleteDD,
.iconbianji{
	font-size: 50rpx;
	margin-right: 30rpx;
}
.iconbianji{
	font-size: 53rpx;
}

.deleteImg{
	text-align: center;
	width: 42vw;
	height: 80rpx;
	line-height: 80rpx;
	position: absolute;
	bottom: 0rpx;
	background-color: rgba(255,255,255,0.8);
	border-bottom-left-radius: 10rpx;
	border-bottom-right-radius: 10rpx;
}
.imgBox{
	position: relative;
	height: 25vh;
	width: 40vw;
	margin-right: 20rpx;
	display: inline-block;
}
.imgLaji{
	font-size: 40rpx;
}
.scrollbox{
	width: 50rpx;
}
.confirmChange{
	font-size: 35rpx;
	letter-spacing: 3px;
}

</style>

<template>
	<view class="body">
		
		<view class="topBox">
			<view class="headBg" :class="[ifhot ? 'hot' : 'cool']">
				<view  class="head">
					<view @tap="navigateBack" >取消</view>
					<view @click="callImgBox">添加照片</view>
					
				</view>
				<view class="selectBox">
					<!-- 时间 -->
					<view  @click="openCancel">  
						<view class="addDiandiweek">{{ currentWeek }}</view>
						<view class="addDiandidate">{{ currentDate }}</view>
					</view>
					<!-- 选择类型 -->
					<view class="selectType" v-if="diandiType === '个人点滴'">
						<view @click="open">
							{{ type }}
							<text 
								class="iconfont iconsanjiaoxing "
								:class="{ tran: ifselect }"
							></text>
						</view>
						<view 
							class="typeBox"
							:class="{ open: ifselect, noOpen: !ifselect }">
							<view 
								v-for="item in allType" 
								:key="item.id" 
								@click="select(item.name,item.id)"
								class="study">
								{{ item.name }}
							</view>
							
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="data">
				
				<textarea 
					class="dataArea" 
					maxlength="2500"
					placeholder="在这里记录下你的点滴" 
					placeholder-style="color: #000;"
					@input="dataLength"
					v-model="diandiData"></textarea>
				
				<view class="textLength">{{ nowLength }}/2500</view>
			</view>
		</view>
		<!-- 添加图片按钮 -->
		<view class="btnBox">
			<view 
				class="addImgBtn hot" 
				@click="addDiandi" 
				:class="[ifhot ? 'hot' : 'cool']">
				添加点滴
			</view>
			
		</view>
		<view class="cover" v-show="ifImg" @click="cancelImgBox"></view>
		<!-- 选择图片 -->
		<view class="imgBox" :class="{ openImgBox: ifImg, notOpenImgBox: !ifImg }">
			<view class="imgBoxTitle">添加图片</view>
			<view class="itemBox">
				<view class=" addImgIcon" @click="addImg">
					+
				</view>
				
				<image 
					v-for="(item,index) in imgList" 
					:src="item" 
					class="pushImg" 
					:key="index" 
					@click="preview(item)">
				</image>
			</view>
		</view>
		<!-- 日历 -->
		<view class="calendar">
			<uni-calendar 
				ref="calendar"
			    :insert="false"
			    :lunar="true" 
			    @confirm="change"
			     ></uni-calendar>
		</view>
		<popup 
			style="position: absolute;left: 0;" 
			v-if="ifNote" 
			:infoData="noteData">
		</popup>
	</view>
</template>

<script>
	import self from '../../static/request.js'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import popup from '@/components/Popup.vue'
	import publicFun from '@/static/public.js'
	export default {
		components: {
			uniCalendar,
			popup
		},
		data() {
			return {
				diandiData: '',
				nowLength: 0,
				ifselect: false,
				type: '选择类型',
				imgList: [],
				ifImg: false,
				token: '',
				linkData: '',
				currentWeek: '',
				currentDate: '',
				returnTime: '',
				addToken:'',
				allType: '',
				typeID: '',
				diandiType: '',
				tampList: [],
				ifNote: false,
				noteData: '',
				ifhot: true,
				pushDiandi: true
			}
		},
		onLoad(option) {
		
			this.diandiType = option.type
		},
		methods: {
			// 预览
			preview (item) {
			
				 wx.previewImage({
					current: item,
					urls: this.tampList
				})
			},
			//返回上一页
			navigateBack () {
				uni.navigateBack()
			},
		
			//打开日历
			openCancel(){
				this.$refs.calendar.open();
				
			},
			// 选择的日期
			change(e) {
				console.log(e)
				let data = new Date()
				let hour = data.getHours()
				let min = data.getMinutes()
				let sec = data.getSeconds()
				this.currentWeek = publicFun.week(e.lunar.nWeek)
				this.currentDate = `${ publicFun.month(e.month) }  ${ e.date },${ e.year }`
				
				this.returnTime = `${e.fulldate} ${this.timeModel(hour)}:${this.timeModel(min)}:${this.timeModel(sec)}`
			},
			// 字数
			dataLength () {
				this.nowLength = this.diandiData.length
			},
			//打开选择类型
			open () {
				this.ifselect = !this.ifselect
			},
			//选择点滴类型
			select (msg,id) {
				this.type = msg
				this.ifselect = false
				this.typeID = id
			},
			//添加图片
			 addImg () {
		
				 // 选择图片
				wx.chooseImage({
				   count: 9,
				   sizeType: ['original', 'compressed'],
				   sourceType: ['album', 'camera'],
				   success: (res) => {
				     // tempFilePath可以作为img标签的src属性显示图片
				     const tempFilePaths = res.tempFilePaths
					this.tampList = this.tampList.concat(tempFilePaths)
					
					// 上传图片
					this.upload(0,0,0,res.tempFilePaths.length,res.tempFilePaths)
					
					for (var i = 0; i < tempFilePaths.length; i++ ) {
						this.$set(this.imgList,this.imgList.length,tempFilePaths[i])
					}
					 
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
							
							this.linkData = this.linkData + data.data + ';'
							
						
						}
					},
					fail: err => {
						fail++
						
					},
					complete: () => {
						len++
						if (len === maxlen) {
							
						} else {
							_this.upload(len,success,fail,maxlen,path)
						}
					}
				 })
			 },
			 //打开选择图片
			 callImgBox () {
				this.ifImg = true
			 },
			 //关闭选择图片
			 cancelImgBox () {
				this.ifImg = false
			 },
			
			 //添加点滴
			 addDiandi () {
				console.log('aa')

				 if (this.diandiData === '') {
					
					 publicFun.note('点滴内容不能为空',this)
					
					
				 } else {
					
					if (this.diandiType === '个人点滴') {
						
						// 个人点滴
						if (this.type === '选择类型') {
							publicFun.note('请选择点滴类型',this)
							
						} else {
							if (this.pushDiandi) {
								this.pushDiandi = false
								wx.showLoading({
								  title: '上传中...',
								})
								
								wx.request({
									url: 'https://wy.lujiahaoo.cn/dddx/api/personal/essay',
									method: 'POST',
									data: {
										 writed_at: this.returnTime,
										 tag: this.typeID,
										 content: this.diandiData,
										 image: this.linkData
									},
									header: {
										'content-type': 'application/x-www-form-urlencoded',
										'Authorization' : 'Bearer ' + this.token
									},
									success: res => {
										
											wx.hideLoading()
										 if (res.data.code === 200 ) {
											publicFun.note('提交成功，点滴正在审核中...',this)
											// uni.report('per_essay','发布个人点滴')
											
											setTimeout(() => {
												uni.navigateBack()
												this.pushDiandi = true
											},1500)
										 } else {
											 publicFun.note(res.data.msg,this)
											setTimeout(() => {
												
												this.pushDiandi = true
											},1500)
											
										 }
									},
									fail: error => {
										console.log(error)
									}
								})
							}
							
							
							
						}
						
					} else {
						if (this.pushDiandi) {
							this.pushDiandi = false
							wx.showLoading({
							  title: '上传中...',
							})
							// 班级点滴
							wx.request({
								url: 'https://wy.lujiahaoo.cn/dddx/api/class/essay',
								method: 'POST',
								data: {
									 writed_at: this.returnTime,
									 content: this.diandiData,
									 image: this.linkData
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded',
									'Authorization' : 'Bearer ' + this.token
								},
								success: res => {
									this.pushDiandi = true
									wx.hideLoading()
									 if (res.data.code === 200 ) {
										 publicFun.note('提交成功，点滴正在审核中...',this)
										 // gio('track', 'per_essay')
										// uni.report('class_essay','发布班级点滴')
										
										setTimeout(() => {
											uni.navigateBack()
										},1501)
									 } else {
										 publicFun.note(res.data.msg,this)
										 
									 }
								},
								fail: error => {
									console.log(error)
								}
							})
						}
						
						
						
					}
					 
					
				 }
			 },
			 //修改时间格式
			 timeModel (num) {
				 let data = num.toString()
				 if (data.length === 1 ) {
					 data = '0' + data 
				 }
				 return data
			 }
		},
		mounted() {
			if (wx.getStorageSync('bgColor') === 'code' ) {
				this.ifhot = false
			} else {
				this.ifhot = true
			}
			self.getRequest('/tag',{},(res) => {
				
				if (res.data.code === 200) {
					this.allType = res.data.data
				}
				
			},(err) => {
				console.log(err)
				
			},'GET')
			// 获取 token
			this.token = wx.getStorageSync('token')
			
			var day = new Date()
			var year = day.getFullYear()
			var date = day.getDate()
			var month = day.getMonth() + 1
			var week = day.getDay()
			var hour = day.getHours()
			var min = day.getMinutes()
			var sec = day.getSeconds()
			
			this.currentWeek = publicFun.week(week)
			
			this.currentDate = `${ publicFun.month(month) }  ${ date },${ year }`
			
			this.returnTime = `${year}-${this.timeModel(month)}-${this.timeModel(date)} ${this.timeModel(hour)}:${this.timeModel(min)}:${this.timeModel(sec)}`
			
			
		}
	}
</script>

<style>
/* pages/addDiandi/addDiandi.wxss */
.headBg{
	
	width: 100vw;
	padding: 50rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #000000;
	
}

.selectType{
	position: relative;
	width: 27vw;
	text-align: center;
}
.tran{
	transform: rotate(180deg);
	display: inline-block;
}
.topBox{
	height: 85vh;
}
.btnBox{
	height: 10vh;
}
.body{
	position: relative;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	width: 100vw;
	justify-content: space-between;
	overflow: hidden;
}
/*头部 start*/
.textLength{
	text-align: right;
}
.head,
.selectBox{
	display: flex;
	width: 85vw;
	justify-content: space-between;

}
.selectBox{
	margin-top: 50rpx;
}
.head{
	color: #000000;
	font-size: 35rpx;

}
/*头部end*/
.addDiandiweek{
	font-size: 72rpx;
}
.addDiandidate{
	font-size: 48rpx;
	margin-top: 5rpx;
}
.data{
	width: 85vw;
	margin: 0 auto;
	line-height: 60rpx;
	font-size: 35rpx;
	letter-spacing: 2rpx;
	margin-top: 50rpx;
}
.addImgBtn{
	width: 289rpx;
	height: 72rpx;
	
	color: #FFFFFF;
	text-align: center;
	line-height: 72rpx;
	border-radius: 3px;
	font-size: 32rpx;
	letter-spacing: 5rpx;
}
.dataArea{
	color: #000000;
	padding: 20upx;
	border-radius: 5px;
	height: 50vh;
}
.iconsanjiaoxing {
	margin-left: 15upx;
	transition: all 0.3s ease;
}
	
.typeBox{
	overflow: hidden;
	width: 100%;
	text-align: center;
	transition: all 0.3s ease;
	position: absolute;
	top: 50upx;
	z-index: 5;
}
.study,
.life{
	height: 35px;
	line-height: 35px;
}
.open{
	height: 350upx;
}
.noOpen{
	height: 0;
}
/* 上传图片 */
.cover{
	position: absolute;
	background-color: rgba(255,255,255,0.3);
	z-index: 2;
	width: 100vw;
	height: 100vh;
}
.imgBox{
	height: 50vh;
	
	overflow: auto;
	display: flex;
	flex-direction: column;
	z-index: 3;
	align-items: center;
	position: absolute;
	background-color: #fff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	width: 100vw;
	color: #000000;
	transition: all 0.3s ease;
	box-shadow: 2px 0px 10px #C8C7CC;
}
.openImgBox{
	bottom: 0;
}
.notOpenImgBox{
	bottom: -50vh;
}
.imgBoxTitle{
	font-size: 40rpx;
	letter-spacing: 5rpx;
	margin-top: 50rpx;
}
.itemBox{
	width: 84vw;
	display: flex;
	flex-wrap: wrap;
	margin-top: 60rpx;
}
.addImgIcon{

	border: 1px solid #000;
	text-align: center;
	line-height: 176rpx;
	font-size: 100rpx;
	font-weight: 100;
}
.addImgIcon,
.pushImg{
	width: 176rpx;
	height: 176rpx;
	border-radius: 5px;
	margin-right: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 2px 2px 5px #C8C7CC;
}

.popupInfo{
	position: absolute;
	z-index: 5;
	width: 80vw;
	height: 20vh;
	left: 50%;
	top: 50%;
	margin-left: -40vw;
	margin-top: -15vh;
	background-color: rgba(0,0,0,0.4);
	color: #fff;
	border-radius: 5px;
	line-height: 20vh;
	text-align: center;
}
</style>

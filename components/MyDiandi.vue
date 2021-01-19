<template>
	<view class="body" >
			
			<!-- 添加 -->
			<view v-if="ifadd" class="iconfont icontianjia" @click="addDiandi"></view>
			<view class="data_box" @touchstart="changePageStart" @touchmove="changePageMove"  >
	
				<!-- 选择菜单 -->
				<slot></slot>
				<!-- 选择菜单结束 -->
	
				<!-- 标题开始 -->
				<view class="title_box" >
					<view class="title">{{ Thetitle }}</view>
					<view class="select" v-if = "Thetitle == '个人点滴'" >
						<view class="nowSelet" @click="getSelectBox">
							<!-- 全部 -->
							{{ typeInfo }}
							<text class="iconfont iconsanjiaoxing" :class="{traIcon: if_select, noTraIcon: !if_select}" ></text>
	
						</view>
						<view class="selectItemBox" :class="{open: if_select, notOpen: !if_select}" >
							<view v-for="item in allType" :key="item.id" @click="changeDiandiType(item.id,item.name)">{{ item.name }}</view>
							<view @click="changeDiandiType('','全部')">全部</view>
						</view>
					</view>
					<navigator :url="'../addressList/addressList'" class="addressList" v-if = "Thetitle == '班级点滴'">
						通讯录
						<text class="iconfont icondianhua"></text>
					</navigator>
					
					
				</view>
				<!-- 标题结束 -->
				<!-- 点滴 -->
				<view class="life_box" :class="{ifmore: morethan3}">
					<!-- 如果没有点滴 -->
					<view
						v-if="!haveDiandi" 
						class="mydiandinote">
						<view class="iconfont iconicon_morenmeiyouxinxi"></view>
						<view>{{ loginInfoNote }}</view>
						<!-- 您还没有发布{{ typeInfo }}点滴 -->
					</view>
					
					<!-- 点滴列表开始 -->
					<navigator 
						v-if="haveDiandi" 
						class="life_item" 
						:class="{notmore:notmore}"
						v-for="(item,index) in nowList" 
						:key="index"
						:url="'../detail/detail?id=' + item.id + '&type=' + Thetitle + '&tag=' + item.tag + '&classid=' + item.classId + '&ifadd=' + ifadd + '&page='+ page +'&index='+ index +'&len='+lifeInfo.length+'&bottomIndex='+ currentIndex +'&diandiType='+ diandiType" >
						<text 
							class="date_number"
							:class="{activeNumber: activeIndex === index}">
							{{ item.day }}
						</text>
						<text 
							class="date_text"
							:class="{activeText: activeIndex === index}">
							{{ item.mon }},{{ item.year }}
						</text>
						<view 
							class="life_info"
							:class="{activeInfo: activeIndex === index}">
							{{ item.info }}
						</view>
					</navigator>
					
					<!-- 点滴列表结束 -->
				</view>
				<!-- 点滴结束 -->
	
			</view>
			
			<view class="bg_paper" >
				
				<!-- 1 -->
				<view  :class="[item_1_style,paper_1_index,ifhot ? 'paper_item_1' : 'paper_item_1_code']" ></view>
			
				<!-- 2 -->
				<view  :class="[item_2_style,paper_2_index,ifhot ? 'paper_item_2' : 'paper_item_2_code']" ></view>
	
				<!-- 3 -->
				<view :class="[item_3_style,paper_3_index,ifhot ? 'paper_item_3' : 'paper_item_3_code']"> </view>
	
				<!-- 4 -->
				<view  :class="[item_4_style,paper_4_index,ifhot ? 'paper_item_4' : 'paper_item_4_code']"></view>
	
				<!-- 5 -->
				<view  :class="[paper_5_index,item_5_style,ifhot ? 'paper_item_5' : 'paper_item_5_code']"></view>
	
				<!-- 6 -->
				<view  :class="[item_6_style,paper_6_index,ifhot ? 'paper_item_1' : 'paper_item_1_code']"></view>
				
				<!-- 7 -->
				<view :class="[item_7_style,paper_7_index,ifhot ? 'paper_item_2' : 'paper_item_2_code']"></view>
		
				<!-- 8 -->
				<view  :class="[item_8_style,paper_8_index,ifhot ? 'paper_item_3' : 'paper_item_3_code']"></view>
	
				<!-- 9 -->
				<view  :class="[item_9_style,paper_9_index,ifhot ? 'paper_item_4' : 'paper_item_4_code']"></view>
	
				<!-- 10 -->
				<view  :class="[item_10_style,paper_10_index,ifhot ? 'paper_item_5' : 'paper_item_5_code']"></view>
			
			</view>
			<popup  v-if="ifNote" :infoData="noteData"></popup>
	 </view>
</template>

<script>
	import self from '../static/request.js'
	import publicFun from '@/static/public.js'
	import popup from '@/components/Popup.vue'
	export default {
		components: {
			popup
		},
		name: 'MyDiandi',
		props: {
			Thetitle: String,
			hidden: Boolean,
			login: Boolean,
			permission: Object,
			load: Boolean
		},
		data() {
			return {
				paper_1_index: 'index_1 ',
				paper_2_index: 'index_2 ',
				paper_3_index: 'index_3 ',
				paper_4_index: 'index_4 ',
				paper_5_index: 'index_5 ',
				paper_6_index: 'index_6 ',
				paper_7_index: 'index_7 ',
				paper_8_index: 'index_8 ',
				paper_9_index: 'index_9 ',
				paper_10_index: 'index_10 ',
				item_1_style: '',
				item_2_style: '',
				item_3_style: '',
				item_4_style: '',
				item_5_style: '',
				item_6_style: '',
				item_7_style: '',
				item_8_style: '',
				item_9_style: '',
				item_10_style: '',
				startX: 0,
				startY: 0,
				title: '个人点滴',
				open: false,
				currentIndex: 1,
				nowPage: 1,
				changePage: 0,
				lock: true,
				lifeInfo:[],
				nowList: '',
				if_select: false,
				diandiType: '',
				typeInfo: '全部',
				haveDiandi: false,
				page: 1,
				morethan3: false,
				allType: '',
				ifadd: true,
				bgGo: true,
				passPage: '',
				notmore: true,
				idList: [],
				activeIndex: 2,
				ifhot: true,
				ifNote: false,
				noteData: '',
				loginInfoNote: '您还没有登陆'
			};
		},
		
		mounted () {
			if (wx.getStorageSync('bgColor') === 'code' ) {
				this.ifhot = false
			} else {
				this.ifhot = true
			}
			
			wx.showLoading({
				title: '正在加载数据...',
				mask: true
			})
			
			if (this.login) {
				this.loginInfoNote = `您还没有发布 ${ this.typeInfo }点滴`
				
				this.diandi()
				
			} else {
				this.loginInfoNote = '您还没有登陆'
				wx.hideLoading()
			}
			
		},
		
		onPageShow () {
			if (this.login) {
				wx.showLoading({
					title:'正在加载数据...',
					mask:true
				})
			
				this.diandi()
				if (this.login) {
					this.loginInfoNote = `您还没有发布 ${ this.typeInfo }点滴`
					
					// this.diandi()
					
				} else {
					this.loginInfoNote = '您还没有登陆'
					// wx.hideLoading()
				}
			}
			
		},
		watch: {
			
			'login': function () {
				wx.showLoading({
					title:'正在加载数据...',
					mask:true
				})
				
				if (this.login) {
					this.loginInfoNote = `您还没有发布 ${ this.typeInfo }点滴`
					
					this.diandi()
					
				} else {
					this.loginInfoNote = '您还没有登陆'
					wx.hideLoading()
				}
				
			},
			'Thetitle': function () {
				
				wx.showLoading({
					title:'正在加载数据...',
					mask:true
				})	
				
				if (this.login) {
				
					
					this.diandi()
				
				} else {
					wx.hideLoading()
				}
			}
		},
		
		methods: {
			addDiandi () {
				if (this.login) {
					uni.navigateTo({
						url: "../addDiandi/addDiandi?type="+this.Thetitle
					})
				} else {
					this.$emit('toLogin',false)
				}
				
				
			},
			// 新的获取数据 （请求两次拼在一起）
			diandi () {
				// 数据初始化
				this.init()
				if (this.Thetitle === '个人点滴') {
					// 获取标签
					self.getRequest('/tag',{},(res) => {
					
						if (res.data.code === 200) {
							this.allType = res.data.data
						}
					},(err) => {
						console.log(err)
						
					},'GET')
					
					// 添加点滴的权限
					this.ifadd = true
					
					self.getRequest('/personal/essays',{
						page: this.page,
						tag: this.diandiType
					}, (res) => {
						
						wx.hideLoading()
						if (res.data.code === 200) {
							// 没有数据的时候
							if (res.data.data === null) {
								this.haveDiandi = false
								
							} else {
								this.haveDiandi = true
								if(res.data.data.length < 3) {
									this.activeIndex = 0
									this.morethan3 = false
									this.notmore = true
								} else {
									this.morethan3 = true
									this.notmore = false
									if (res.data.data.length === 3) {
										this.activeIndex = 1
									} else {
										this.activeIndex = 2
									}
								}
								this.rotate(this.lifeInfo,res.data.data)
								if (this.lifeInfo.length <= 4) {
									this.nowList = this.lifeInfo
								} else {
									this.nowList = this.lifeInfo.slice(this.lifeInfo.length-4,this.lifeInfo.length)
								}
								
								// 请求下一页的数据
								self.getRequest('/personal/essays',{
									page: this.page+1,
									tag: this.diandiType
								}, (res) => {
									if (res.data.data != null) {
										this.rotate(this.lifeInfo,res.data.data)
										
									}
									for (var i = 0; i < this.lifeInfo.length; i++) {
										this.idList.push(this.lifeInfo[i].id)
									}
									
								},(err) => {},'GET')
							}
						
						} else {
							publicFun.note(res.data.msg,this)
							
						}
					},(error) => {
						console.log('error',error)
					},'GET')
				} else {
					// 班级点滴
					
					if (getApp().globalData.personal.permission.write === true) {
						this.ifadd = true
					} else {
						this.ifadd = false
					}
					self.getRequest('/class/essays',{
						page: this.page
					},(res) => {
					
						wx.hideLoading()
						if (res.data.code === 200) {
							
							if (res.data.data === null) {
								this.haveDiandi = false
								
							} else {
								this.haveDiandi = true
								if(res.data.data.length < 3) {
									this.activeIndex = 0
									this.morethan3 = false
									this.notmore = true
								} else {
									this.morethan3 = true
									this.notmore = false
									if (res.data.data.length === 3) {
										this.activeIndex = 1
									} else {
										this.activeIndex = 2
									}
								}
								
								this.rotate(this.lifeInfo,res.data.data)
								if (this.lifeInfo.length < 4) {
									this.nowList = this.lifeInfo
								} else {
									this.nowList = this.lifeInfo.slice(this.lifeInfo.length-4,this.lifeInfo.length)
								}
								// 请求下一页的数据
								self.getRequest('/class/essays',{
									page: this.page+1
								}, (res) => {
									if (res.data.data != null) {
										this.rotate(this.lifeInfo,res.data.data)
										
									}
									
								},(err) => {},'GET')
							
							}
						} else {
							publicFun.note(res.data.msg,this)
							
						} 
					},(err) => {
						console.log(err)
					},'GET')
				}
			},
		
			// 将数据倒换顺序
			rotate (source,result) {
			
				for (var i = 0;i < result.length;i++) {
					let data = {}
					
					data = publicFun.getDay(result[i].writed_at)
					if (result[i].content.length >= 10) {
						data.info = result[i].content.slice(0,10) + '...'
					} else {
						data.info = result[i].content
					}
					
					data.id = result[i].id
					data.tag = result[i].tag
					if (this.Thetitle === '班级点滴') {
						data.classId = result[i].classid
					}
					source.unshift(data)
				
				}
				return source
			},
			/**
			*滑动开始
			*/
			changePageStart: function (e) {
			  this.startX = e.touches[0].pageX
			  this.startY = e.touches[0].pageY
			},
			
			
			// 获取数据
			getDiandi () {
				
				self.getRequest('/personal/essays',{
					page: this.page,
					tag: this.diandiType
				}, (res) => {
					
					if (res.data.code === 200) {
						// 没有数据
						if (res.data.data === null) {
							this.haveDiandi = false
							
						} else {
							this.haveDiandi = true
							// 少于3条数据
							if(res.data.data.length < 3) {
								this.activeIndex = 0
								this.morethan3 = false
								this.notmore = true
							} else {
								this.morethan3 = true
								this.notmore = false
								if (res.data.data.length === 3) {
									this.activeIndex = 1
								} else {
									this.activeIndex = 2
								}
							}
							
							this.rotate(this.lifeInfo,res.data.data)
							
							if (this.lifeInfo.length < 4) {
								this.nowList = this.lifeInfo
							} else {
								this.nowList = this.lifeInfo.slice(this.lifeInfo.length-4,this.lifeInfo.length)
							}
						
						}
						
					}  
				},(error) => {
					console.log('error',error)
				},'GET')
			},
			
			/**
			*滑动
			* 第一次获取数据   
			* 	小于4条
			* 		无法滑动
			* 	大于4条
			* 		小于10
			* 			currentIndex == 4 时无法滑动
			* 		大于10
			* 			currentIndex === 4 时 获取新数据
			* 			
			*/
			changePageMove: function (e) {
				// 触碰屏幕时的位置
				var currentX = e.touches[0].pageX
				var currentY = e.touches[0].pageY
				var moveX = currentX - this.startX
				var moveY = currentY - this.startY
		
				// 上下滑动
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 向下滑动 往日点滴
					if(this.lock && moveY > 0){
						
						this.lock = false
						
						// this.datadown()
						if (this.lifeInfo.length <= 4) {
							
							if (this.activeIndex > 0) {
								this.activeIndex --
								this.bgDown()
							} else {
								publicFun.note('没有更多往日点滴',this)
								
								this.lock = true
								
							}
							
							
							
						} else if (this.currentIndex === this.lifeInfo.length-3 && this.lifeInfo.length <= 10) {
							
							if (this.activeIndex > 0) {
								this.activeIndex --
								this.bgDown()
							} else {
								publicFun.note('没有更多往日点滴',this)
								
								this.lock = true
								
							}
						} else if (this.currentIndex === 10) {
							
							this.page++
						
							this.lifeInfo = this.lifeInfo.slice(0,this.lifeInfo.length-10)
							
							// 请求下一页的数据
							self.getRequest('/personal/essays',{
								page: this.page+1,
								tag: this.diandiType
							}, (res) => {
								if (res.data.data != null) {
									this.rotate(this.lifeInfo,res.data.data)
									
								} 
								
							},(err) => {},'GET')
							
							this.currentIndex = 1
							if (this.lifeInfo.length <= 4) {
								this.nowList = this.lifeInfo
								if (this.activeIndex > 0) {
									this.activeIndex --
									this.bgDown()
								} else {
									publicFun.note('没有更多往日点滴',this)
									
									this.lock = true
									
								}
							} else {
								if (this.activeIndex > 2) {
									this.activeIndex--
								}
								this.bgDown()
								this.nowList = this.lifeInfo.slice(this.lifeInfo.length-this.currentIndex-3,this.lifeInfo.length-this.currentIndex+1)
								
							}
						
							
						} else {
							
							
							if (this.currentIndex === this.lifeInfo.length-3) {
								
								if (this.activeIndex > 0) {
									this.activeIndex --
									this.bgDown()
								} else {
									publicFun.note('没有更多往日点滴',this)
									
									this.lock = true
									
								}
							} else {
								if (this.activeIndex > 2) {
									this.activeIndex--
								} else {
									this.currentIndex++
									this.nowList = this.lifeInfo.slice(this.lifeInfo.length-this.currentIndex-3,this.lifeInfo.length-this.currentIndex+1)
								}
								
								this.bgDown()
							}
							
							
						}
						
						
					
					} else {
						// 向上滑动 新的点滴
						if (this.lock) {
							this.lock = false
							
							if (this.lifeInfo.length <= 4) {
								
								if (this.activeIndex < this.lifeInfo.length-1) {
									this.activeIndex++
									 this.bgUp()
								} else {
									publicFun.note('当前已是最新点滴',this)
									
									this.lock = true
									
								}
								
							} else if (this.currentIndex === 1 && this.page === 1) {
								
								if (this.activeIndex < 3) {
									this.activeIndex ++
									this.bgUp()
								} else {
									publicFun.note('当前已是最新点滴',this)
								
									this.lock = true
								
								}
								
							} else if (this.currentIndex === 1) {
								
								this.page--
								
								
								// 请求下一页的数据
								
								if (this.lifeInfo.length > 10) {
									this.lifeInfo = this.lifeInfo.slice(this.lifeInfo.length-10,this.lifeInfo.length)
									
									self.getRequest('/personal/essays',{
										page: this.page,
										tag: this.diandiType
									}, (res) => {
										
										if (res.data.data != null) {
											
											let result = res.data.data
											for (var i = result.length-1;i >= 0 ;i--) {
												let data = {}
												
												data = publicFun.getDay(result[i].writed_at)
												if (result[i].content.length >= 10) {
													data.info = result[i].content.slice(0,10) + '...'
												} else {
													data.info = result[i].content
												}
												
												data.id = result[i].id
												data.tag = result[i].tag
												if (this.Thetitle === '班级点滴') {
													data.classId = result[i].classid
												}
												this.lifeInfo.push(data)
											
											}
											
											
										}
										if (this.activeIndex < 2) {
											this.activeIndex++
										}
										 this.currentIndex = 10
										  this.nowList = this.lifeInfo.slice(this.lifeInfo.length-this.currentIndex-3,this.lifeInfo.length-this.currentIndex+1)
										 this.bgUp()
										 
									},(err) => {},'GET')
								} else {
									self.getRequest('/personal/essays',{
										page: this.page,
										tag: this.diandiType
									}, (res) => {
									
										if (res.data.data != null) {
											
											let result = res.data.data
											for (var i = result.length-1;i >= 0 ;i--) {
												let data = {}
												
												data = publicFun.getDay(result[i].writed_at)
												if (result[i].content.length >= 10) {
													data.info = result[i].content.slice(0,10) + '...'
												} else {
													data.info = result[i].content
												}
												
												data.id = result[i].id
												data.tag = result[i].tag
												if (this.Thetitle === '班级点滴') {
													data.classId = result[i].classid
												}
												this.lifeInfo.push(data)
											
											}
											
											
										}
										 this.currentIndex = 10
										 if (this.activeIndex < 2) {
										 	this.activeIndex++
										 }
										  this.nowList = this.lifeInfo.slice(this.lifeInfo.length-this.currentIndex-3,this.lifeInfo.length-this.currentIndex+1)
										 this.bgUp()
										 
									},(err) => {},'GET')
								}
							
							} else {
								
								if (this.activeIndex < 2) {
									this.activeIndex++
								} else {
									this.currentIndex--
									this.nowList = this.lifeInfo.slice(this.lifeInfo.length-this.currentIndex-3,this.lifeInfo.length-this.currentIndex+1)
								}
							
								this.bgUp()
							}
						}
						
					}
			  
				}
			},
			// 打开关闭选择类型
			getSelectBox () {
				this.if_select = !this.if_select
				
			},
			/**
			* 点击选择不同的类别
			*/ 
			changeDiandiType (type,info) {
			
				this.diandiType = type
				
				this.if_select = false
				this.typeInfo = info
				
				this.page = 1
				this.lifeInfo = []
				this.getDiandi()
				
			},
			// 初始化 
			init () {
				this.paper_1_index = 'index_1 '
				this.paper_2_index = 'index_2 '
				this.paper_3_index = 'index_3 '
				this.paper_4_index = 'index_4 '
				this.paper_5_index = 'index_5 '
				this.paper_6_index = 'index_6 '
				this.paper_7_index = 'index_7 '
				this.paper_8_index = 'index_8 '
				this.paper_9_index = 'index_9 '
				this.paper_10_index = 'index_10 '
				this.item_1_style = 
				this.item_2_style = 
				this.item_3_style = 
				this.item_4_style = 
				this.item_5_style = 
				this.item_6_style = 
				this.item_8_style = 
				this.item_9_style = 
				this.item_10_style = ''
				
				this.lifeInfo = []
				this.currentIndex = 1
				this.nowPage = 1
				this.changePage = 0
				this.lock = true
				this.page = 1
				this.nowList = ''
			},
			// 背景图片向上切换
			bgUp () {
				// 要切换掉的 page 数
				var num
						
				if (--this.changePage == 0) {
					num = 10
				}else{
					num = this.changePage
				}
				this.changePage = num
				// nowpage 在最前面的页数
				
				switch(this.nowPage){
					
					case 1: 
						this.paper_1_index = 'index_2 '
						this.paper_2_index = 'index_3 '
						this.paper_3_index = 'index_4 '
						this.paper_4_index = 'index_5 '
						this.paper_5_index = 'index_6 '
						this.paper_6_index = 'index_7'
						this.paper_7_index = 'index_8 '
						this.paper_8_index = 'index_9 '
						this.paper_9_index = 'index_10 '
						this.item_10_style= 'changToDown'
						this.item_1_style= 'downToOne'
						this.item_2_style= 'downToTwo'
						this.item_3_style= 'downToThree'
						this.item_4_style= 'downToFour'
						this.item_5_style= 'downToFive'
						this.item_6_style= 'downToSix'
						
					    setTimeout(() => {
					     	this.paper_10_index = 'index_1 '
					        
					    },1000)           
					    break
					case 2: 
						this.paper_2_index = 'index_2 '
						this.paper_3_index = 'index_3 '
						this.paper_4_index = 'index_4 '
						this.paper_5_index = 'index_5'
						this.paper_6_index = 'index_6 '
						this.paper_7_index = 'index_7 '
						this.paper_8_index = 'index_8 '
						this.paper_9_index = 'index_9 '
						this.paper_10_index = 'index_10 '
						this.item_1_style= 'changToDown'
						this.item_2_style= 'downToOne'
						this.item_3_style= 'downToTwo'
						this.item_4_style=  'downToThree'
						this.item_5_style= 'downToFour' 
						this.item_6_style= 'downToFive'
						this.item_7_style= 'downToSix' 
						this.item_8_style= ''
						this.item_9_style= '' ,
						this.item_10_style= '' ,
						setTimeout(() => {
							this.paper_1_index = 'index_1 '
						},1000)
					    break
					case 3: 
						this.paper_3_index = 'index_2 '
						this.paper_4_index = 'index_3 '
						this.paper_5_index = 'index_4 '
						this.paper_6_index = 'index_5'
						this.paper_7_index = 'index_6 '
						this.paper_8_index = 'index_7 '
						this.paper_9_index = 'index_8 '
						this.paper_10_index = 'index_9 '
						this.paper_1_index = 'index_10 '
						this.item_1_style= ''
						this.item_2_style= 'changToDown'
						this.item_3_style= 'downToOne'
						this.item_4_style=  'downToTwo'
						this.item_5_style= 'downToThree' 
						this.item_6_style= 'downToFour'
						this.item_7_style= 'downToFive'
						this.item_8_style='downToSix' 
						this.item_9_style= '' ,
						this.item_10_style= '' ,
						setTimeout(() => {
							this.paper_2_index = 'index_1 '
						},1000)
					    break
					case 4: 
						this.paper_4_index = 'index_2 '
						this.paper_5_index = 'index_3 '
						this.paper_6_index = 'index_4'
						this.paper_7_index = 'index_5 '
						this.paper_8_index = 'index_6 '
						this.paper_9_index = 'index_7 '
						this.paper_10_index = 'index_8 '
						this.paper_1_index = 'index_9 '
						this.paper_2_index = 'index_10 '
						this.item_1_style= ''
						this.item_2_style= ''
						this.item_3_style= 'changToDown'
						this.item_4_style= 'downToOne'
						this.item_5_style=  'downToTwo'
						this.item_6_style= 'downToThree' 
						this.item_7_style= 'downToFour' 
						this.item_8_style= 'downToFive'
						this.item_9_style= 'downToSix' 
						this.item_10_style= ''
						setTimeout(() => {
							this.paper_3_index = 'index_1 '
						},1000)
					    break
					case 5: 
						this.paper_5_index = 'index_2 '
						this.paper_6_index = 'index_3 '
						this.paper_7_index = 'index_4 '
						this.paper_8_index = 'index_5 '
						this.paper_9_index = 'index_6 ' 
						this.paper_10_index = 'index_7 '
						this.paper_1_index = 'index_8 '
						this.paper_2_index =  'index_9'
						this.paper_3_index = 'index_10 '
						this.item_1_style= ''
						this.item_2_style= ''
						this.item_3_style= ''
						this.item_4_style= 'changToDown'
						this.item_5_style= 'downToOne'
						this.item_6_style= 'downToTwo'
						this.item_7_style= 'downToThree' 
						this.item_8_style= 'downToFour' 
						this.item_9_style= 'downToFive'
						this.item_10_style=  'downToSix'
						setTimeout(() => {
							this.paper_4_index = 'index_1 '
						 
						},1000) 
						break
					 case 6:
					    this.paper_6_index = 'index_2 '
					    this.paper_7_index = 'index_3 '
					    this.paper_8_index = 'index_4 '
					    this.paper_9_index = 'index_5 '
					    this.paper_10_index = 'index_6 ' 
					    this.paper_1_index = 'index_7 '
					    this.paper_2_index ='index_8 '
					    this.paper_3_index = 'index_9'
					    this.paper_4_index = 'index_10 '
					    this.item_1_style= 'downToSix'
					    this.item_2_style= ''
					    this.item_3_style= ''
					    this.item_4_style= ''
					    this.item_5_style= 'changToDown'
					    this.item_6_style= 'downToOne'
					    this.item_7_style= 'downToTwo'
					    this.item_8_style= 'downToThree' 
					    this.item_9_style= 'downToFour' 
					    this.item_10_style= 'downToFive' 
					    setTimeout(() => {
					    	this.paper_5_index = 'index_1 '
					    								               
					    },1000)
					    break
					case 7:
						this.paper_7_index = 'index_2 '
						this.paper_8_index = 'index_3 '
						this.paper_9_index = 'index_4 '
						this.paper_10_index = 'index_5 '
						this.paper_1_index = 'index_6 ' 
						this.paper_2_index = 'index_7 '
						this.paper_3_index = 'index_8 '
						this.paper_4_index = 'index_9'
						this.paper_5_index = 'index_10 '
						this.item_1_style= 'downToFive'
						this.item_2_style= 'downToSix'
						this.item_3_style= ''
						this.item_4_style= ''
						this.item_5_style= ''
						this.item_6_style= 'changToDown'
						this.item_7_style= 'downToOne'   
						this.item_8_style= 'downToTwo'
						this.item_9_style='downToThree' 
						this.item_10_style= 'downToFour'              
						setTimeout(() => {
							this.paper_6_index = 'index_1 '
														              
						},1000)
					    break
					case 8:
						
						 this.paper_8_index = 'index_2 '
						 this.paper_9_index = 'index_3 '
						 this.paper_10_index = 'index_4 '
						 this.paper_1_index = 'index_5 '
						 this.paper_2_index = 'index_6 ' 
						 this.paper_3_index = 'index_7 '
						 this.paper_4_index = 'index_8 '
						 this.paper_5_index = 'index_9'
						 this.paper_6_index = 'index_10 '
						 this.item_1_style= 'downToFour'
						 this.item_2_style= 'downToFive'
						 this.item_3_style= 'downToSix'
						 this.item_4_style= ''
						 this.item_5_style= ''
						 this.item_6_style= ''
						 this.item_7_style= 'changToDown'
						 this.item_8_style= 'downToOne'  
						 this.item_9_style= 'downToTwo' 
						 this.item_10_style= 'downToThree'
						 setTimeout(() => {
							this.paper_7_index = 'index_1 '
						 },1000)
					    break
					case 9:
						
						this.paper_9_index = 'index_2 '
						this.paper_10_index = 'index_3 '
						this.paper_1_index = 'index_4 '
						this.paper_2_index = 'index_5 '
						this.paper_3_index = 'index_6 '
						this.paper_4_index = 'index_7 '
						this.paper_5_index = 'index_8 '
						this.paper_6_index = 'index_9'
						this.paper_7_index = 'index_10 '
						this.item_1_style= 'downToThree'
						this.item_2_style= 'downToFour'
						this.item_3_style= 'downToFive'
						this.item_4_style= 'downToSix'
						this.item_5_style= ''
						this.item_6_style= ''
						this.item_7_style= '' 
						this.item_8_style= 'changToDown' 
						this.item_9_style= 'downToOne' 
						this.item_10_style= 'downToTwo'
						setTimeout(() => {
							this.paper_8_index = 'index_1 '
						},1000)
						break
					case 10:
						
						this.paper_10_index = 'index_2 '
						this.paper_1_index = 'index_3 '
						this.paper_2_index = 'index_4 ' 
						this.paper_3_index = 'index_5 '
						this.paper_4_index = 'index_6 '
						this.paper_5_index = 'index_7 '
						this.paper_6_index = 'index_8'
						this.paper_7_index = 'index_9 '
						this.paper_8_index = 'index_10'
						this.item_1_style= 'downToTwo'
						this.item_2_style= 'downToThree'
						this.item_3_style= 'downToFour'
						this.item_4_style= 'downToFive'
						this.item_5_style= 'downToSix'
						this.item_6_style= ''
						this.item_7_style= '' 
						this.item_8_style= '' 
						this.item_9_style= 'changToDown' 
						this.item_10_style= 'downToOne'
						setTimeout(() => {
							this.paper_9_index = 'index_1 '
						},1000)
						break
						
				
				}
								 
				setTimeout(() => {
					this.lock = true
					// 在最前面的 page 数
					var now
					if (--this.nowPage == 0) {
						now = 10
					}else{
						now = this.nowPage
					}
					this.nowPage = now
					
				},1000)
			},
			// 背景图片向下切换
			bgDown () {
				// 要切换掉的 page 数
				var num
						
				if (++this.changePage == 11) {
					num = 1
				}else{
					num = this.changePage
				}
				this.changePage = num
				
				switch(this.nowPage){
					
					 case 1: 
						this.paper_2_index = 'index_1 '
						this.paper_3_index = 'index_2 '
						this.paper_4_index = 'index_3 '
						this.paper_5_index = 'index_4 '
						this.paper_6_index = 'index_5'
						this.paper_7_index = 'index_6 '
						this.paper_8_index = 'index_7 '
						this.paper_9_index = 'index_8 '
						this.paper_10_index = 'index_9 '
						this.item_1_style= 'addanimation'
						this.item_2_style= 'changeToOne'
						this.item_3_style= 'changeToTwo'
						this.item_4_style= 'changeToThree'
						this.item_5_style= 'changeToFour'
						this.item_6_style= 'changeToFive'
						this.item_7_style= 'changeToSix'
					    setTimeout(() => {
					     	this.paper_1_index = 'index_10 '
					        
					    },1000)           
					    break
					case 2: 
						this.paper_3_index = 'index_1 '
						this.paper_4_index = 'index_2 '
						this.paper_5_index = 'index_3 '
						this.paper_6_index = 'index_4'
						this.paper_7_index = 'index_5 '
						this.paper_8_index = 'index_6 '
						this.paper_9_index = 'index_7 '
						this.paper_10_index = 'index_8 '
						this.paper_1_index = 'index_9 '
						this.item_1_style= ''
						this.item_2_style= 'addanimation'
						this.item_3_style= 'changeToOne'
						this.item_4_style= 'changeToTwo'
						this.item_5_style= 'changeToThree'
						this.item_6_style= 'changeToFour'
						this.item_7_style= 'changeToFive' 
						this.item_8_style= 'changeToSix' 
						this.item_9_style= '' ,
						this.item_10_style= '' ,
						setTimeout(() => {
							this.paper_2_index = 'index_10 '
						},1000)
					    break
					case 3: 
						this.paper_4_index = 'index_1 '
						this.paper_5_index = 'index_2 '
						this.paper_6_index = 'index_3'
						this.paper_7_index = 'index_4 '
						this.paper_8_index = 'index_5 '
						this.paper_9_index = 'index_6 '
						this.paper_10_index = 'index_7 '
						this.paper_1_index = 'index_8 '
						this.paper_2_index = 'index_9 '
						this.item_1_style= ''
						this.item_2_style= ''
						this.item_3_style= 'addanimation'
						this.item_4_style= 'changeToOne'
						this.item_5_style= 'changeToTwo'
						this.item_6_style= 'changeToThree'
						this.item_7_style= 'changeToFour' 
						this.item_8_style= 'changeToFive' 
						this.item_9_style= 'changeToSix' 
						this.item_10_style= ''
						setTimeout(() => {
							this.paper_3_index = 'index_10 '
						},1000)
					    break
					case 4: 
						this.paper_5_index = 'index_1 '
						this.paper_6_index = 'index_2'
						this.paper_7_index = 'index_3 '
						this.paper_8_index = 'index_4 '
						this.paper_9_index = 'index_5 '
						this.paper_10_index = 'index_6 '
						this.paper_1_index = 'index_7 '
						this.paper_2_index = 'index_8 ' 
						this.paper_3_index = 'index_9 '
						this.item_1_style= ''
						this.item_2_style= ''
						this.item_3_style= ''
						this.item_4_style= 'addanimation'
						this.item_5_style= 'changeToOne'
						this.item_6_style= 'changeToTwo'
						this.item_7_style= 'changeToThree' 
						this.item_8_style= 'changeToFour' 
						this.item_9_style= 'changeToFive'
						this.item_10_style= 'changeToSix'  
					    setTimeout(() => {
					    	this.paper_4_index = 'index_10 '
					     
					    },1000)  
					    break
					case 5: 
						this.paper_6_index = 'index_1'
						this.paper_7_index = 'index_2 '
					    this.paper_8_index = 'index_3 '
					    this.paper_9_index = 'index_4 '
					    this.paper_10_index = 'index_5 '
					    this.paper_1_index = 'index_6 '
						this.paper_2_index = 'index_7 '
						this.paper_3_index = 'index_8 '
					    this.paper_4_index = 'index_9 '
					    this.item_1_style= 'changeToSix'
					    this.item_2_style= ''
					    this.item_3_style= ''
					    this.item_4_style= ''
					    this.item_5_style= 'addanimation'
					    this.item_6_style= 'changeToOne'
					    this.item_7_style= 'changeToTwo' 
					    this.item_8_style= 'changeToThree' 
					    this.item_9_style= 'changeToFour' 
					    this.item_10_style= 'changeToFive' 
						setTimeout(() => {
							this.paper_5_index = 'index_10 '
														               
						},1000)
						break
					 case 6:
					    this.paper_7_index = 'index_1 '
					    this.paper_8_index = 'index_2 '
					    this.paper_9_index = 'index_3 '
					    this.paper_10_index = 'index_4 '
					    this.paper_1_index = 'index_5 '
					    this.paper_2_index = 'index_6 '
					    this.paper_3_index = 'index_7 '
					    this.paper_4_index = 'index_8 '
					    this.paper_5_index = 'index_9 '
					    this.item_1_style= 'changeToFive'
					    this.item_2_style= 'changeToSix'
					    this.item_3_style= ''
					    this.item_4_style= ''
					    this.item_5_style= ''
					    this.item_6_style= 'addanimation'
					    this.item_7_style= 'changeToOne' 
					    this.item_8_style= 'changeToTwo' 
					    this.item_9_style='changeToThree' 
					    this.item_10_style= 'changeToFour'              
					    setTimeout(() => {
					    	this.paper_6_index = 'index_10 '
					    								              
					    },1000)
					    break
					case 7:
						this.paper_8_index = 'index_1 '
						this.paper_9_index = 'index_2 '
						this.paper_10_index = 'index_3 '
						this.paper_1_index = 'index_4 '
						this.paper_2_index = 'index_5 ' 
						this.paper_3_index = 'index_6 '
						this.paper_4_index = 'index_7 '
						this.paper_5_index = 'index_8 '
						this.paper_6_index = 'index_9'
						this.item_1_style= 'changeToFour'
						this.item_2_style= 'changeToFive'
						this.item_3_style= 'changeToSix'
						this.item_4_style= ''
						this.item_5_style= ''
						this.item_6_style= ''
						this.item_7_style= 'addanimation' 
						this.item_8_style= 'changeToOne' 
						this.item_9_style= 'changeToTwo' 
						this.item_10_style= 'changeToThree'
					    setTimeout(() => {
					    	this.paper_7_index = 'index_10 '
					    },1000)
					    break
					case 8:
						this.paper_9_index = 'index_1 '
						this.paper_10_index = 'index_2 '
						this.paper_1_index = 'index_3 '
						this.paper_2_index = 'index_4 '
						this.paper_3_index = 'index_5 '
						this.paper_4_index = 'index_6 '
						this.paper_5_index = 'index_7 '
						this.paper_6_index = 'index_8'
						this.paper_7_index = 'index_9 '
						this.item_1_style= 'changeToThree'
						this.item_2_style= 'changeToFour'
						this.item_3_style= 'changeToFive'
						this.item_4_style= 'changeToSix'
						this.item_5_style= ''
						this.item_6_style= ''
						this.item_7_style= '' 
						this.item_8_style= 'addanimation' 
						this.item_9_style= 'changeToOne' 
						this.item_10_style= 'changeToTwo'
					    setTimeout(() => {
					    	this.paper_8_index = 'index_10 '
					    },1000)
					    break
					case 9:
						this.paper_10_index = 'index_1 '
						this.paper_1_index = 'index_2 '
						this.paper_2_index = 'index_3 ' 
						this.paper_3_index = 'index_4 '
						this.paper_4_index = 'index_5 '
						this.paper_5_index = 'index_6 '
						this.paper_6_index = 'index_7'
						this.paper_7_index = 'index_8 '
						this.paper_8_index = 'index_9'
						this.item_1_style= 'changeToTwo'
						this.item_2_style= 'changeToThree'
						this.item_3_style= 'changeToFour'
						this.item_4_style= 'changeToFive'
						this.item_5_style= 'changeToSix'
						this.item_6_style= ''
						this.item_7_style= '' 
						this.item_8_style= '' 
						this.item_9_style= 'addanimation' 
						this.item_10_style= 'changeToOne'
						setTimeout(() => {
							this.paper_9_index = 'index_10 '
						},1000)
						break
					case 10:
						this.paper_1_index = 'index_1 '
						this.paper_2_index = 'index_2 ' 
						this.paper_3_index = 'index_3 '
						this.paper_4_index = 'index_4 '
						this.paper_5_index = 'index_5 '
						this.paper_6_index = 'index_6'
						this.paper_7_index = 'index_7 '
						this.paper_8_index = 'index_8'
						this.paper_9_index = 'index_9 '
						this.item_1_style= 'changeToOne'
						this.item_2_style= 'changeToTwo'
						this.item_3_style= 'changeToThree'
						this.item_4_style= 'changeToFour'
						this.item_5_style= 'changeToFive'
						this.item_6_style= 'changeToSix'
						this.item_7_style= '' 
						this.item_8_style= '' 
						this.item_9_style= '' 
						this.item_10_style= 'addanimation' 
						setTimeout(() => {
							this.paper_10_index = 'index_10 '
						},1000)
						break
				
				}
								 
				setTimeout(() => {
					this.lock = true
					// 在最前面的 page 数
					var now
					if (++this.nowPage == 11) {
						now = 1
					}else{
						now = this.nowPage
					}
					this.nowPage = now
				},1000)
			}
			
			
		
		}
	}
</script>

<style>

.body {
	width: 100vw;
	flex-shrink: 0;
	position: relative;
	transition: all 1s;
}
.data_box{
	position: relative;
	z-index: 12;
	top: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

}
/*每条点滴开始*/
.cover{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	background: rgba(0,0,0,0.3);
	z-index: 10000;

}
.life_box{
	height: 78vh;
	display: flex;
	flex-direction: column;
	padding-bottom: 5vh;
}
.ifmore{
	justify-content: space-between;
}
.notmore{
	margin-bottom: 30rpx;
}
.date_number,
.date_text {  
    -webkit-text-stroke:1rpx #000;
    color: transparent;
	display: inline;
} 
.date_number{
	font-size: 110rpx;
}
.date_text{
	font-size: 38rpx;
	margin-left: 25rpx;
}
.life_info{
	font-size:38rpx;
	opacity: 0.7;
}
.life_item,
.mydiandinote{
	margin-left: 123rpx;
}
.mydiandinote{
	font-size: 35upx;
	letter-spacing: 5upx;
}
.activeNumber,
.activeText{
	-webkit-text-stroke: 0rpx #000;
	color: #000;
}
.activeNumber{
	font-size: 210rpx;
}
.activeText{
	font-size: 55rpx;
}
.activeInfo{
	font-size: 50rpx;
	opacity: 1;
}

.icontianjia{
	position: absolute;
	top: 45vh;
	right: 50rpx;
	z-index: 13;
	font-size: 110rpx;
	font-weight: 100;
}
/*每条点滴结束*/
/*选择菜单开始*/
.bar>view{
	height: 4px;
	border-radius: 3px;
	background: #000;
}
.bar>view:nth-child(1),
.bar>view:nth-child(3){
	width: 46rpx;
}
.bar>view:nth-child(2){
	width: 36rpx;
}
.bar>view:nth-child(1),
.bar>view:nth-child(2){
	margin-bottom: 14rpx;

}
.bar{
	margin-left: 60rpx;
}
/*选择菜单结束*/
/*标题开始*/

.title{
	font-size: 40rpx;
	margin-left: 99rpx;
	letter-spacing: 15rpx;
}
.title_box{

	display: flex;
	justify-content: space-between;
}
.select{
	
	position: relative;

}
.selectItemBox{
	position: absolute;
	height: 0rpx;
	overflow: hidden;
	transition: all 0.3s;

}
.open{
	height:300upx;
}
.notOpen{
	height: 0upx;
}
.iconsanjiaoxing{
	display: inline-flex;
	transition: all 0.3s;
	margin-left: 15upx;
}

.nowSelet,
.selectItemBox>view{
	margin-bottom: 20rpx;
}
.traIcon{
	transform:rotate(180deg);
}
.noTraIcon{
	transform:rotate(0deg);
}
.select,
.addressList,
.edit{
	margin-right: 70rpx;
	font-size: 30rpx;
	height: 50rpx;

}
/*通讯录*/
.icondianhua{
	font-size: 38rpx;
	margin-left: 10rpx;
}
.addressList{
	display: flex;
	align-items: center;
}


/*标题结束*/
/*纸张开始*/

.index_6{
	top: -30rpx;
	left: 540rpx;
	z-index: 5;
	transform:rotate(0deg);
}
.index_7{
	top: -40rpx;
	left: 600rpx;
	z-index: 4;
	transform:rotate(5deg);
}
.index_8{
	top: -50rpx;
	left: 700rpx;
	z-index: 3;
	transform:rotate(10deg);
}
.index_9{
	top: -60rpx;
	left: 800rpx;
	z-index: 2;
	transform:rotate(15deg);
}
.index_10{
	top: 300rpx;
	left: 1000rpx;
	z-index: 11;
	transform:rotate(-50deg);
}
/*纸张结束*/
/*动画*/
@keyframes down{
	from{
		top: 900rpx;
		left: 1000rpx;
		z-index: 11;
		transform:rotate(-50deg);
	}
	to{
		transform:rotate(-25deg);
		top: 290rpx;
		left: 150rpx;
	}
}
@keyframes rot {
	0% {
		transform:rotate(-25deg);
		top: 290rpx;
		left: 150rpx;
	}
	100% {
		top: 900rpx;
		left: 1000rpx;
		transform:rotate(-50deg);
	}
}
@keyframes changeToOne {
	0% {
		top: 175rpx;
		left: 220rpx;
		z-index: 9;
		transform:rotate(-20deg);
	}
	100% {
		top: 290rpx;
		left: 150rpx;
		transform:rotate(-25deg);
		z-index: 10;
	}
}
@keyframes  downToOne{
	from{
		top: 290rpx;
		left: 150rpx;
		transform:rotate(-25deg);
		z-index: 10;
	}
	to{
		top: 175rpx;
		left: 220rpx;
		z-index: 9;
		transform:rotate(-20deg);
	}
}
@keyframes changeToTwo{
	0% {
		top: 80rpx;
		left: 290rpx;
		z-index: 8;
		transform:rotate(-15deg);
	}
	100% {
		top: 175rpx;
		left: 220rpx;
		z-index: 9;
		transform:rotate(-20deg);
	}
}
@keyframes downToTwo{
	from{
		top: 175rpx;
		left: 220rpx;
		z-index: 9;
		transform:rotate(-20deg);
	}
	to{
		top: 80rpx;
		left: 290rpx;
		z-index: 8;
		transform:rotate(-15deg);
	}
}
@keyframes changeToThree{
	0% {
		top: 10rpx;
		left: 360rpx;
		z-index: 7;
		transform:rotate(-10deg);
	}
	100% {
		top: 80rpx;
		left: 290rpx;
		z-index: 8;
		transform:rotate(-15deg);
	}
}
@keyframes downToThree{
	from{
		top: 80rpx;
		left: 290rpx;
		z-index: 8;
		transform:rotate(-15deg);
	}
	to{
		top: 10rpx;
		left: 360rpx;
		z-index: 7;
		transform:rotate(-10deg);
	}
}
@keyframes changeToFour{
	0% {
		top: -20rpx;
		left: 420rpx;
		z-index: 6;
		transform:rotate(-5deg);
	}
	100% {
		top: 10rpx;
		left: 360rpx;
		z-index: 7;
		transform:rotate(-10deg);
	}
}
@keyframes downToFour{
	from{
		top: 10rpx;
		left: 360rpx;
		z-index: 7;
		transform:rotate(-10deg);
	}
	to{
		top: -20rpx;
		left: 420rpx;
		z-index: 6;
		transform:rotate(-5deg);
	}
}
@keyframes changeToFive{
	0% {
		top: -30rpx;
		left: 540rpx;
		z-index: 5;
		transform:rotate(0deg);
	}
	100% {
		top: -20rpx;
		left: 420rpx;
		z-index: 6;
		transform:rotate(-5deg);
	}
}
@keyframes downToFive{
	from{
		top: -20rpx;
		left: 420rpx;
		z-index: 6;
		transform:rotate(-5deg);
	}
	to{
		top: -30rpx;
		left: 540rpx;
		z-index: 5;
		transform:rotate(0deg);
	}
}
@keyframes changeToSix{
	0% {
		top: -40rpx;
		left: 600rpx;
		z-index: 4;
		transform:rotate(5deg);
	}
	100% {
		top: -30rpx;
		left: 540rpx;
		z-index: 5;
		transform:rotate(0deg);
	}
}
@keyframes downToSix{
	from{
		top: -30rpx;
		left: 540rpx;
		z-index: 5;
		transform:rotate(0deg);
	}
	to{
		top: -40rpx;
		left: 600rpx;
		z-index: 4;
		transform:rotate(5deg);
	}
}
.addanimation {
	animation: 1s rot   ease;
}
.changeToOne{
	animation: 1s changeToOne   ease;
}
.downToOne{
	animation: 1s downToOne   ease;
}
.changeToTwo{
	animation: 1s changeToTwo  ease;
}
.downToTwo{
	animation: 1s downToTwo   ease;
}
.changeToThree{
	animation: 1s changeToThree   ease;
}
.downToThree{
	animation: 1s downToThree   ease;
}
.changeToFour{
	animation: 1s changeToFour   ease;
}
.downToFour{
	animation: 1s downToFour   ease;
}
.changeToFive{
	animation: 1s changeToFive   ease;

}
.downToFive{
	animation: 1s downToFive   ease;
}
.changeToSix{
	animation: 1s changeToSix   ease;	
}
.downToSix{
	animation: 1s downToSix   ease;
}	
.changToDown{
	animation: 1s down   ease;	
}

.iconicon_morenmeiyouxinxi{
	font-size: 300upx;
	margin-bottom: 50upx;
}
</style>

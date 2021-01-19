<template>
	
	<view  class="classInitBox">

		<!-- 头部 start -->
		<view class="head" >
			<!-- 选择菜单 -->
			<slot ></slot>
			<view class="welcome" :class="ifhot ? 'hotText' : 'coldText'">欢迎来到</view>
			<view class="colloge" :class="ifhot ? 'hotText' : 'coldText'">
				<text class="diandi">点滴</text>大学
			</view>
			<image :src="ifhot ? '../static/images/hotAddClassBg.png' : '../static/images/coldAddClassBg.png'" class="headBackground"></image>
		</view>
		<!-- 头部 end  -->
		<!-- 内容主体 start -->
		<view class="content">
			<view>
				<!-- 标题 -->
				<view class="classtitle" :class="ifhot ? 'hotText' : 'coldText'">{{ title }}</view>
				<!-- 加入班级 -->
				<view class="joinClass" v-show="!ifcreate">
					<view class="classIdText">班级名称</view>
					<view class="inputBox">
						<input 
							type="text" 
							name="" 
							placeholder="请输入班级名称" 
							:class="ifhot ? 'hotInputBg' : 'coldInputBg'" 
							class="idInput" 
							v-model="classID" />
						<icon type="search" class="searchIcon" size="24" @click="searchClass"></icon>
					</view>
					<scroll-view scroll-y="true" class="schoolScrollBox">
						<view class="addBox" v-if="currectClass" v-for="(item,index) in classList" :key="index">
							<view 
								class="infoBox"
								 :class="ifhot ? 'hotInputBg' : 'coldInputBg'" >
								<view>
									<text>ID：{{ item.id }}</text>
									<text class="count">{{ item.count }}人</text>
								</view>
								<view class="classSchool">{{ item.university }}</view>
								<view class="theClass">{{ item.name }}</view>
							</view>
							<icon 
								type="clear"
								 :color="ifhot ? '#f8dca4' : '#add2fc'"
								 
								size="53" 
								class="addIcon" 
								@click="_join(index)" ></icon>
						</view>
					</scroll-view>
					
					
				</view>
				<!-- 创建班级 -->
				<view v-show="ifcreate" class="creatClass">
					<view class="choiceSchool">
						<view class="schoolText">学校</view>
						<view class="schoolInput">
							<picker 
								class="pick"
								header-text="选择学校" 
								mode="multiSelector"
								@change = "bindCustomPickerChange"
								@columnchange = "bindCustomPickerColumnChange"
								:value="customIndex"
				 				:range="onlyArray"
								:class="[init ? 'defau' : '',ifhot ? 'hotInputBg' : 'coldInputBg']"
				 				
							>
							<view>
								{{ init ? '请选择学校': onlyArray[2][customIndex[2]] }}
							</view>
							
							</picker>
						</view>
						
					</view>
					<view class="choiceClass">
						<view class="classText">班级</view>
						<input 
							:class="ifhot ? 'hotInputBg' : 'coldInputBg'"
							type="text" 
							name="" 
							placeholder="请填写班级名称" 
							class="classInput" 
							v-model="creatClassName"  />
					</view>
					<view 
						class="createBtn" 
						@click="create"
						:class="ifhot ? 'hotaddBg' : 'coldaddBg'"
						>创建班级</view>
	
				</view>
			</view>
			<view class="create" @click="_tocreate">{{ link }}</view>
		</view>
		<!-- 内容主体 end -->
		<!-- 点击加入班级 start -->
		<view class="ask" v-if="ifJoin">
			<view class="questionBox">
				<view class="quesTitle">加入申请</view>
				<view class="qAnda">
					<view class="question">问： {{ question }}</view>
					<view class="answer">答： <input type="text" name="" placeholder="请输入问题的答案" class="answerInput" v-model="answer"/></view>
				</view>
				
				<view class="btnBox">
					<view class="confirmBtn" @click="_confirmJoin">确定</view>
					<view class="cancelBtn" @click="_cancelJoin">取消</view>
				</view>
			</view>
		</view>
		<!-- 点击加入班级 end -->
		<!-- 消息提示 -->
	
		<popup v-if="ifNote" :infoData="noteData"></popup>
	</view>
</template>

<script>
	import self from '../static/request.js'
	import school from '../static/school.js'
	import popup from '@/components/Popup.vue'
	import publicFun from '@/static/public.js'
	export default {
		components: {
			popup
		},
		data() {
			return {
				ifhot: true,
				ifJoin: false,
				ifcreate: false,
				title: '加入班级',
				link: '创建班级',
				init: true,
				customIndex: [0, 0, 0],
				 //当前选中数组
				 onlyArray: [
				  [],
				  [],
				  []
				 ],
				customArray: '',
				classID: '',
				creatClassName: '',
				currectClass: false,
				classList: '',
				questionList: [
					'你们班的班歌是什么',
					'你们班有多少人脱单了',
					'你们班总共聚过多少次会',
					'你们班第一次班级聚会是在哪里举办的'
				],
				question: '',
				answer: '',
				ReqID: '',
				ifNote: false,
				noteData: ''
			};
		},
		props:{
			classCode: String,
			classId: String,
			login: Boolean,
		},
		watch: {
			classCode () {
				if (this.login) {
					this.inviJoin()
				}
				
			},
			login () {
				
				if (this.login) {
					this.inviJoin()
				}
			}
		},
		mounted () {
			if (wx.getStorageSync('bgColor') === 'code' ) {
				this.ifhot = false
			} else {
				this.ifhot = true
			}
			
			if (this.login) {
				this.inviJoin()
			}
			
			// 把学校信息赋值
			this.customArray = school.data
			
			var data = {
				customArray: this.customArray,
				customIndex: this.customIndex,
				onlyArray: this.onlyArray,
			};
			 
			
			for (var i = 0; i < data.customArray.length; i++) {
				data.onlyArray[0].push(data.customArray[i].value);
			}
			for (var j = 0; j < data.customArray[data.customIndex[0]].childs.length; j++) {
				data.onlyArray[1].push(data.customArray[data.customIndex[0]].childs[j].value);
			}
			for (var k = 0; k < data.customArray[data.customIndex[0]].childs[data.customIndex[1]].childs.length; k++) {
				data.onlyArray[2].push(data.customArray[data.customIndex[0]].childs[data.customIndex[1]].childs[k].value);
			}
			
			this.onlyArray = data.onlyArray
		},
		methods: {
			// 邀请码加入班级
			inviJoin () {
				if (this.classCode != '') {
					
					self.getRequest('/class/user',{
						code: this.classCode,
						id: parseInt(this.classId)
					},(res) => {
						
						if (res.data.code === 200) {
							publicFun.note('加入班级成功',this,3000)
							uni.report('join_class','加入班级')
													
							// 更新信息
							self.getRequest('/user/profile',{
								
							},(res) => {
								
								if (res.data.code === 200) {
									
									getApp().globalData.personal = res.data.data
									setTimeout(() => {
										this.$emit('getclass',true)
									},800)
								}
							},(err) => {
								console.log(err)
							},'GET')
						} else {
							publicFun.note(res.data.msg,this,3000)
						}
						
					},(err) => {
						console.log(err)
					},'POST','application/json')
				}
			},
			_join (index) {
				if (!this.login) {
					this.$emit('toLogin',false)
				} else {
					this.ReqID = this.classList[index].id
					if (this.classList[index].direct) {
						
						self.getRequest('/class/user',{
							id: this.ReqID
						},(res) => {
							
							if (res.data.code === 200) {
								publicFun.note('加入班级成功',this)
								uni.report('join_class','加入班级')
							
								// 更新信息
								self.getRequest('/user/profile',{
									
								},(res) => {
									
									if (res.data.code === 200) {
										
										getApp().globalData.personal = res.data.data
										setTimeout(() => {
											this.$emit('getclass',true)
										},800)
									}
								},(err) => {
									console.log(err)
								},'GET')
							}
						},(err) => {
							console.log(err)
						},'POST')
					} else {
						this.ifJoin = true
						this.question = this.questionList[this.classList[index].question]
					}
				}
				
				
			 
			},
			_confirmJoin () {
				
				self.getRequest('/class/user',{
					id: this.ReqID,
					answer: this.answer
				},(res) => {
					
					if (res.data.code === 10001) {
						
						publicFun.note('已拥有班级',this)
						
					} else if (res.data.code === 10003) {
						
						publicFun.note('加入班级失败',this)
						
					} else if (res.data.code === 200) {
					
						publicFun.note('成功加入班级',this)
						uni.report('join_class','加入班级')
						// 更新信息
						self.getRequest('/user/profile',{
							
						},(res) => {
							
							if (res.data.code === 200) {
								getApp().globalData.personal = res.data.data
								setTimeout(() => {
									this.$emit('getclass',true)
								},800)
							}
						},(err) => {
							console.log(err)
						},'GET')
					
					}
					setTimeout(() => {
						this.ifJoin = false
						
					},1000)
				},(err) => {
					console.log(err)
				},'POST')
				
			},
			_cancelJoin () {
				this.ifJoin = false
			
			},
			// 切换到创建班级
			_tocreate () {
			  if (!this.ifcreate) {
				  this.ifcreate = true
				  this.title = '创建班级'
				  this.link = '加入班级'
				
			  } else {
				this.ifcreate = false,
				this.title = '加入班级',
				this.link = '创建班级'
				
			  }
			  
			},
			
			//点击创建班级
			create () {
				if (!this.login) {
					this.$emit('toLogin',false)
				} else {
					self.getRequest('/class',{
						university: this.onlyArray[2][this.customIndex[2]],
						name: this.creatClassName
					}, (res) => {
						
						if (res.data.code === 200) {
							
							publicFun.note('创建班级成功',this)
							
							self.getRequest('/user/profile',{
								
							},(res) => {
								
								if (res.data.code === 200) {
									getApp().globalData.personal = res.data.data
									setTimeout(() => {
										this.$emit('getclass',true)
									},800)
								}
							},(err) => {
								console.log(err)
							},'GET')
							
							
						} else if (res.data.code === 500) {
							publicFun.note('网络出现问题，请稍后再试',this)
							
						} else if (res.data.code === 10002) {
							publicFun.note('已拥有班级',this)
							
						} else {
							publicFun.note(res.data.msg,this)
							
						}
					}, (error) => {
						console.log('error',error)
					},'POST')
				}
				
			
			},
			
			 //多列自定义选择器改变value的方法
			bindCustomPickerChange: function(e) {
			
			  var customArray = this.customArray,
			  customIndex = this.customIndex,
			  onlyArray = this.onlyArray;
			 
			 
			 //此处e.detail.value为当前选择的列的下标值数组，如[0,1,0]
			
			  
			  this.customIndex = e.detail.value
			  this.$set(this.customIndex,0,e.detail.value[0])
			  this.$set(this.customIndex,1,e.detail.value[1])
			  this.$set(this.customIndex,2,e.detail.value[2])
			},
			       
			//多列自创选择器换列方法
			bindCustomPickerColumnChange: function(e) {
				
				this.init = false
			 
				var customArray = this.customArray
				var customIndex = this.customIndex
				var onlyArray = this.onlyArray
				
				customIndex[e.detail.column] = e.detail.value;
		
			   
			  var searchColumn = () => {
				 
				for (var i = 0; i < customArray.length; i++) {
				  var arr1 = []
				  var arr2 = []
				  if (i == customIndex[0]) {
					 
					for (var j = 0; j < customArray[i].childs.length; j++) {
					  arr1.push(customArray[i].childs[j].value)
					  if (j == customIndex[1]) {
						for (var k = 0; k < customArray[i].childs[j].childs.length; k++) {
						 arr2.push(customArray[i].childs[j].childs[k].value)
						}
						onlyArray[2] = arr2
					  }
					}
				   onlyArray[1] = arr1
				  }
				}
			  }
			   
			  switch (e.detail.column) {
				case 0:
				  customIndex[1] = 0
				  customIndex[2] = 0
				  searchColumn()
				  break
				case 1:
				  customIndex[2] = 0;
				  searchColumn()
				  break
			  }
				
				this.customIndex = customIndex
				this.$set(this.onlyArray,0,onlyArray[0])
				this.$set(this.onlyArray,1,onlyArray[1])
				this.$set(this.onlyArray,2,onlyArray[2])
			 
			},
			// 搜索班级
			searchClass () {
				
				// 把之前搜索的数据清空
				this.classList = ''
				this.currectClass = false
				
				wx.request({
				  url: 'https://wy.lujiahaoo.cn/dddx/api/class/search', 
				  data: {
				    key: this.classID
				  },
				  header: {
				    'content-type': 'application/json'
				  },
				  method: 'GET',
				  success: (res) => {
				    
					if (res.data.code === 200) {
						if (res.data.data != null) {
							
							this.currectClass = true
							this.classList = res.data.data
							
						} else {
							publicFun.note('未找到班级',this)
							
						}
					}
					
				  },
				  fail (error) {
				  	console.log(error)
				  }
				})
			}
		}
	}
</script>

<style>
	.hotaddBg{
		background-color: #f8dca4;
	}
	.coldaddBg{
		background-color: #add2fc;
	}
	.hotText{
		color: #978052;
	}
	.coldText{
		color: #6083ab;
	}
	.classInitBox{
		position: relative;
	}
	.defau {
		color:#707570;
	}
	/*头部 start */
	.head{
		padding-top: 20rpx;
		height: 36vh;
		width: 100vw;
		position: relative;
	
	}
	.headBackground{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background-size: 100% 100%;
		z-index: -1;
	}
	.welcome,
	.colloge{
		font-size: 48rpx;
		letter-spacing: 8rpx;
	}
	.welcome{
		margin-left: 90rpx;
		margin-top: 4vh;
	}
	.colloge{
		margin-left: 180rpx;
		margin-top: 2vh;
	}
	.diandi {
		font-size: 60rpx;
	}
	/*头部 end */
	/*内容主体 start*/
	.content{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		height: 62vh;
	}
	.classtitle{
		font-size: 36rpx;
		text-align: center; 
	}
	/*加入班级 start*/
	.schoolScrollBox{
		height: 30vh;
		margin-top: 58rpx;
		width: 666rpx;
	}
	.joinClass{
		width: 618rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 50rpx;
	}
	.hotInputBg{
		background-color: rgba(253,244,228,1);
	}
	.coldInputBg{
		background-color: rgba(237,245,253,1);
	}
	.idInput{
		width: 508rpx;
		height: 76rpx;
		padding-left: 26rpx;
		font-size: 30rpx;
		border-radius: 5px;
		padding-right: 80rpx;
	}
	.inputBox{
		position: relative;
		margin-top: 30rpx;
	}
	.searchIcon{
		position: absolute;
		top: 12rpx;
		right: 20rpx;
	}
	.classIdText{
		font-size: 30rpx;
	}
	.infoBox{
		width: 558rpx;
		height: 262rpx;
		font-size: 30rpx;
		color: #556656;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex-wrap: wrap;
		padding-left: 60rpx;
	}
	.addBox{
		position: relative;
		margin-bottom: 58rpx;
	}
	.addIcon{
		position: absolute;
		
		left: 545rpx;
		bottom: -44rpx;
		transform: rotate(45deg);
	}
	.count{
		margin-left: 90rpx;
	}
	
	/*加入班级end*/
	/*创建班级start*/
	.creatClass{
		margin-top: 5vh;
	}
	.choiceSchool,
	.choiceClass{
		display: flex;
	
	}
	.classInput,
	
	.pick{
		width: 447rpx;
		height: 76rpx;
		padding: 0 20rpx;
		border-radius: 3px;
		line-height: 76rpx;
	}
	.createBtn{
		width: 371rpx;
		height: 75rpx;
		color: #fff;
		text-align: center;
		line-height: 75rpx;
		border-radius: 3px;
		margin: 0 auto;
		margin-top: 40rpx;
	}
	
	.choiceClass,
	.createBtn{
		margin-top: 5vh;
	}
	.schoolText,
	.classText{
		height: 76rpx;
		line-height: 76rpx;
		margin-right: 30rpx;
		font-size: 30rpx;
	}
	/*创建班级end*/
	/*内容主体 end*/
	.create{
		text-align: center;
		font-size: 36rpx;
		letter-spacing: 5rpx;
		margin-bottom: 5vh;
	}
	/*点击加入班级 start*/
	.ask{
		position: absolute;
		top: 0;
		z-index: 2;
		background: rgba(0,0,0,0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}
	.questionBox{
		width: 600rpx;
		height: 475rpx;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
	}
	.answerInput{
		width: 400rpx;
		height: 60rpx;
		background: rgba(0,0,0,0.1);
		padding: 0 10rpx;
		font-size: 28rpx;
		border-radius: 3px;
	}
	.quesTitle{
		font-size: 34rpx;
		letter-spacing: 5rpx;
	}
	.cancelBtn{
		margin-left: 180rpx;
	}
	.answer{
		margin-top: 36rpx;
		display: inline-flex;
	}
	
	.question{
		margin-top: 55rpx;
	}
	.btnBox{
		display: inline-flex;
		margin-top: 90rpx;
	}
	.qAnda{
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		letter-spacing: 3rpx;
	}
	/*点击加入班级 end*/

</style>

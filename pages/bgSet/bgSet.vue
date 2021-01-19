<template>
	<view class="bgBox">
		<view class="bgTitle">更改背景颜色</view>
		<view class="chooiceBox">
			<view class="chooiceItem ">
				<view class="colorImgBox" @click="choiceColor(1)">
					<image src="../../static/images/hot.png" class="colorBox "></image>
					<view class="clickCover" v-if="ifchooice&&ifhot">
						<text class="iconfont icongou"></text>
					</view>
					<view class="notCover" v-if="ifchooice&&!ifhot"></view>
				</view>
				<view class="colorItem">暖色系</view>
			</view>
			<view class="chooiceItem">
				<view class="colorImgBox" @click="choiceColor(2)">
					<image src="../../static/images/code.png" class="colorBox"></image>
					<view class="clickCover" v-if="ifchooice&&!ifhot">
						<text class="iconfont icongou"></text>
					</view>
					<view class="notCover" v-if="ifchooice&&ifhot"></view>
				</view>
				<view class="colorItem">冷色系</view>
			</view>
		</view>
		<view v-if="ifchooice" class="haveChoice">您已选择了
			<text :class="{ hotColor: ifhot, codeColor: !ifhot}">{{ ifhot ? '暖色系' : '冷色系' }}</text>
		</view>
		<view class="confirmSet" v-if="ifchooice" @click="confirm">确认</view>
		<view v-if="!ifchooice" class="chooiceText">请选择其中一种色系</view>
		<popup 
			style="position: absolute;left: 0;top: 0;"  
			v-if="ifNote" 
			:infoData="noteData">
		</popup>
	</view>
</template>

<script>
	import popup from '@/components/Popup.vue'
	import publicFun from '@/static/public.js'
	export default {
		components: {
			
			popup
		},
		data() {
			return {
				ifchooice: false,
				ifhot: true,
				ifNote: false,
				noteData: ''
			}
		},
		methods: {
			choiceColor (color) {
				this.ifchooice = true
				if (color === 2) {
					this.ifhot = false
					
				} else {
					this.ifhot = true
				}
			},
			confirm () {
				if (this.ifhot) {
					wx.setStorageSync('bgColor','hot')
				
				} else {
					wx.setStorageSync('bgColor','code')
					
				}
				publicFun.note('设置成功',this)
				setTimeout(() => {
					uni.reLaunch({
					    url: '../index/index'
					});
					
				},1500)
			
			
			}
		}
	}
</script>

<style>
.bgBox{
	width: 100vw;
	height: 100vh;
	background-color: #eeeeed;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.confirmSet{
	width: 290rpx;
	height: 74rpx;
	background-color: #b7cfb8;
	color: #fff;
	text-align: center;
	line-height: 74rpx;
	margin-top: 3vh;
}

.colorImgBox{
	width: 42.5vw;
	height: 40vh;
	position: relative;
}
.colorBox,
.clickCover,
.notCover{
	width: 100%;
	height: 100%;
	border-radius: 10px;
}
.icongou{
	font-size: 100rpx;
	color: #fff;
}
.clickCover{
	text-align: center;
	line-height: 40vh;
	position: absolute;
	z-index: 2;
	top: 0;
}
.notCover{
	background-color: rgba(255,255,255,0.6);
	position: absolute;
	z-index: 2;
	top: 0;
}
.chooiceBox{
	display: flex;
	width: 90vw;
	margin-top: 2vh;
	justify-content: space-between;
}
.bgTitle{

	font-size: 40rpx;
	letter-spacing: 5rpx;
	margin: 5vh 0;
}
.haveChoice{
	letter-spacing: 5rpx;
	font-size: 35rpx;
	margin-top: 15vh;
}
.colorItem{
	text-align: center;
	margin-top: 3vh;
	
}
.chooiceText,
.colorItem{
	font-size: 35rpx;
	letter-spacing: 1px;
}
.chooiceText{
	margin-top: 12vh;
}
.hotColor{
	color: #f9d4bb;
}
.codeColor{
	color: #add2fc;
}
</style>

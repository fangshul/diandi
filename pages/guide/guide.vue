<template>
	<view class="guideBox">
		<view class="jop">
			<navigator url="../index/index" open-type="reLaunch" >跳过</navigator>
		</view>
	
		<swiper class="itemBox" indicator-dots="true" indicator-color="#fff" indicator-active-color="#fad7ab">
			<swiper-item v-for="(item,index) in info" :key="index">
				<view class="guideItem">
					<video 
						class="guideImg"
						 object-fit="fill"
						 autoplay="true"
						 loop="true"
						:controls="control"
						:src="item.link" ></video>
			
					<view class="guideText">{{ item.text }}</view>
				</view>
				
			</swiper-item>
			
		</swiper>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				control: false,
				info: [
					{
						text:'上下滑动可查看更多点滴',
						link:'http://lujiahaobucket.oss-accelerate.aliyuncs.com/20200614/animation1.mp4'
					},
					{
						text:'左右滑动可查看上一条或下一条点滴',
						link:'http://lujiahaobucket.oss-accelerate.aliyuncs.com/20200614/animation2.mp4'
					},
					{
						text:'添加点滴时点击“日期”可变更点滴的日期',
						link:'http://lujiahaobucket.oss-accelerate.aliyuncs.com/20200614/animation3.mp4'
					},
					{
						text:'点击“更多”→“浮窗”将小程序悬浮于微信主页，方便下一次使用。',
						link:'http://lujiahaobucket.oss-accelerate.aliyuncs.com/20200614/animation4.mp4'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.jop{
		height: 10vh;
		display: flex;
		padding: 0 12vw;
		justify-content: flex-end;
		color: #FFFFFF;
		font-size: 37rpx;
		line-height: 10vh;
	}
.guideBox{
	width: 100vw;
	height: 100vh;
	background-color: #b7cfb8;
}
.itemBox{
	width: 100vw;
	height: 88vh;
	
}
.guideText{
	padding: 30rpx;
	color: #fff;
}
.guideItem{
	width: 69vw;
	margin: 0 auto;
}
.guideImg{
	width: 69vw;
	height: 67vh;
	border-radius: 15px;
}
</style>

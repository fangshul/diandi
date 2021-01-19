<template>
	<view class="setBody">
		<!-- 选择菜单 -->
		<slot ></slot>
		<!-- 选择菜单结束 -->
		<view class="setBox">
			<!-- title -->
			<view class="setTitle">设置</view>
			<!-- title end -->
			<navigator url="../bgSet/bgSet" class="setBg">
				<view class="leftBox">
					<text class="iconfont iconbackground"></text>点滴背景
				</view>
				<view class="iconfont iconxiayiye rightBox"></view>
			</navigator>
			<navigator class="guide" url="../guide/guide">
				<view class="leftBox">
					<image class="guideIcon" src="../static/images/settingIcon.png"></image>新手指引
				</view>
				<view class="iconfont iconxiayiye rightBox"></view>
			</navigator>
			<navigator class="feedback" url="../feedback/feedback">
				<view class="leftBox">
					<image class="guideIcon" src="../static/images/feedback.png"></image>用户反馈
				</view>
				<view class="iconfont iconxiayiye rightBox"></view>
			</navigator>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>

.setBody{
	width: 100vw;
	height: 97vh;
	background-color: #eeeeed;
	padding-top: 3vh;
}
.setBox{
	width: 80vw;
	margin: 0 auto;
}
.setTitle{
	font-size: 45rpx;
	margin: 3vh 0;
	margin-left: 10rpx;
	letter-spacing: 3rpx;
}
.setBg,
.guide,
.feedback{
	background-color: #fff;
	width: 100%;
	height: 95rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 5px;
	margin-bottom: 3vh;
}
.iconbackground{
	color: #b7cfb8;
	font-size: 40rpx;

}
.guideIcon{
	width: 45rpx;
	height: 45rpx;
	display: inline-flex;
	vertical-align: top;
}
.guideIcon,
.iconbackground{
	margin-right: 30rpx;
}
.leftBox{
	margin-left: 30rpx;
	letter-spacing: 3rpx;
}
.rightBox{
	margin-right: 30rpx;
}
</style>

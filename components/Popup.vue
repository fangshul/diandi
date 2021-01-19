<template>
	
	<view class="popupBox">
		<view class="popup">
			<view>
				<image src="../static/images/popupLeft.png" class="popupIcon"></image>
			</view>
			<view class="popupText">{{ info }}</view>
			<view>
				<image src="../static/images/popupRight.png" class="popupIcon"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		props: {
			
			infoData: String
		},
		data() {
			return {
				
				info: ''
			};
		},
	
		methods: {
			
		},
		mounted() {
			this.info = this.infoData
			
		},
		watch: {
			
		}
	}
</script>

<style>
.popupBox{
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000000;
	background-color: rgba(0,0,0,0.5);
}
.popup{
	display: inline-flex;
	min-height: 90rpx;
	width: 60vw;
	justify-content: space-between;
	align-items: center;
	border-radius: 5px;
	background-color: #fff;
	padding: 15rpx 0;
}
.popupIcon{
	width: 40rpx;
	height: 40rpx;
	margin: 0 25rpx;
}
.popupText{
	line-height: 50rpx;
	color: #000000;
}
</style>

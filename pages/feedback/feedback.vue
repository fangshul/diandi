<template>
	<view>
		<view class="feedbackText">用户反馈</view>
		<textarea placeholder="请输入问题或建议" class="feedbackBox" v-model="feedbackData"></textarea>
		<view class="submit" @click="submit">提交</view>
		<popup v-if="ifNote" :infoData="noteData"></popup>
	</view>
</template>

<script>
	import self from '../../static/request.js'
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
				feedbackData: ''
			}
		},
		methods: {
			submit () {
				console.log('data',this.feedbackData)
				if (this.feedbackData === '') {
					publicFun.note('反馈内容不能为空',this)
				} else {
					self.getRequest('/feedback',{
						content : this.feedbackData
					},(res) => {
						console.log(res)
						if (res.data.code  === 200) {
							publicFun.note('感谢您的反馈',this)
							setTimeout(() => {
								uni.reLaunch({
								    url: '../index/index'
								});
								
							},1500)
						} else {
							publicFun.note(res.data.msg,this)
						}
					},(err) => {
						
					},'POST')
				}
				
				
			}
		}
	}
</script>

<style>
.feedbackText{
	text-align: center;
	font-size: 40rpx;
	letter-spacing: 5rpx;
	margin-top: 5vh;
}
.submit{
	
	background-color: #b7cfb8;
	width: 300rpx;
	margin: 0 auto;
	height: 70rpx;
	color: #FFFFFF;
	line-height: 70rpx;
	text-align: center;
	
}
.feedbackBox{
	padding: 30rpx;
	border: 1px solid #b7cfb8;
	width: 75vw;
	height: 470rpx;
	margin: 6vh auto;
}
</style>

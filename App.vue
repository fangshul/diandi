<script>
import self from './static/request.js'
import Vue from 'vue'
export default {
	globalData: {  
		// 微信的用户信息
	    userInfo: '',
		iflogin: '',
		// 在小程序的用户信息
		personal: '',
		// 第一次登陆
		ifFirst: true
		
	},
	onLaunch: function(e) {
		console.log('App Launch');
		// #ifdef MP-WEIXIN
		Vue.prototype.StatusBar = e.statusBarHeight;
		let custom = wx.getMenuButtonBoundingClientRect();
		Vue.prototype.Custom = custom;
		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
		// #endif	
	},
	onShow: function() {
		console.log('App Show');
		//查看是否授权（已授权则可以获取用户微信信息）
		
		
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import './static/fontAwesome.css';
@import './static/iconfont.css';
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}

/* #endif */
 .hot{
	background-color: #F8DCA5;
 }
 .cool{
	background-color: #ADD2FC;
 }
.bg_paper{
	position: absolute;
	top: 0;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
 .paper_item_1,
.paper_item_2,
.paper_item_3,
.paper_item_4,
.paper_item_5,
.paper_item_1_code,
.paper_item_2_code,
.paper_item_3_code,
.paper_item_4_code,
.paper_item_5_code{
	width: 950rpx;
	height: 1100rpx;
	position: absolute;
}
.paper_item_1{
	background-image: -moz-linear-gradient( 0deg, rgb(248,220,164) 0%, rgb(250,208,196) 100%);
	background-image: -webkit-linear-gradient( 0deg, rgb(248,220,164) 0%, rgb(250,208,196) 100%);
	background-image: -ms-linear-gradient( 0deg, rgb(248,220,164) 0%, rgb(250,208,196) 100%);
	


}
.paper_item_2{
	background-image: -moz-linear-gradient( 0deg, rgb(222,236,221) 0%, rgb(193,223,196) 100%);
	background-image: -webkit-linear-gradient( 0deg, rgb(222,236,221) 0%, rgb(193,223,196) 100%);
	background-image: -ms-linear-gradient( 0deg, rgb(222,236,221) 0%, rgb(193,223,196) 100%);

	
	
}
.paper_item_3{
	background-image: -moz-linear-gradient( 0deg, rgb(236,228,220) 0%, rgb(209,182,161) 100%);
	background-image: -webkit-linear-gradient( 0deg, rgb(236,228,220) 0%, rgb(209,182,161) 100%);
	background-image: -ms-linear-gradient( 0deg, rgb(236,228,220) 0%, rgb(209,182,161) 100%);

	
}
.paper_item_4{
	background-image: -moz-linear-gradient( 0deg, rgb(226,235,240) 0%, rgb(207,217,223) 100%);
	background-image: -webkit-linear-gradient( 0deg, rgb(226,235,240) 0%, rgb(207,217,223) 100%);
	background-image: -ms-linear-gradient( 0deg, rgb(226,235,240) 0%, rgb(207,217,223) 100%);
	
	

	
}
.paper_item_5{
	background-image: -moz-linear-gradient( 0deg, rgb(251,237,150) 0%, rgb(171,236,214) 100%);
	background-image: -webkit-linear-gradient( 0deg, rgb(251,237,150) 0%, rgb(171,236,214) 100%);
	background-image: -ms-linear-gradient( 0deg, rgb(251,237,150) 0%, rgb(171,236,214) 100%);

} 
.paper_item_1_code{

	  background-image: -moz-linear-gradient( 0deg, rgb(194,233,251) 0%, rgb(161,196,253) 98%);
	  background-image: -webkit-linear-gradient( 0deg, rgb(194,233,251) 0%, rgb(161,196,253) 98%);
	  background-image: -ms-linear-gradient( 0deg, rgb(194,233,251) 0%, rgb(161,196,253) 98%);
	 
}
.paper_item_2_code{
	
	  background-image: -moz-linear-gradient( 0deg, rgb(212,252,121) 2%, rgb(150,230,161) 100%);
	  background-image: -webkit-linear-gradient( 0deg, rgb(212,252,121) 2%, rgb(150,230,161) 100%);
	  background-image: -ms-linear-gradient( 0deg, rgb(212,252,121) 2%, rgb(150,230,161) 100%);
	  

}
.paper_item_3_code{
	
	  background-image: -moz-linear-gradient( 0deg, rgb(207,217,223) 2%, rgb(226,235,240) 100%);
	  background-image: -webkit-linear-gradient( 0deg, rgb(207,217,223) 2%, rgb(226,235,240) 100%);
	  background-image: -ms-linear-gradient( 0deg, rgb(207,217,223) 2%, rgb(226,235,240) 100%);
	 

}
.paper_item_4_code{
	
	  background-image: -moz-linear-gradient( 0deg, rgb(145,196,156) 0%, rgb(253,251,251) 98%);
	  background-image: -webkit-linear-gradient( 0deg, rgb(145,196,156) 0%, rgb(253,251,251) 98%);
	  background-image: -ms-linear-gradient( 0deg, rgb(145,196,156) 0%, rgb(253,251,251) 98%);

}
.paper_item_5_code{
	
	  background-image: -moz-linear-gradient( 0deg, rgb(255,241,235) 2%, rgb(172,224,249) 100%);
	  background-image: -webkit-linear-gradient( 0deg, rgb(255,241,235) 2%, rgb(172,224,249) 100%);
	  background-image: -ms-linear-gradient( 0deg, rgb(255,241,235) 2%, rgb(172,224,249) 100%);

}
 .index_1{
	top: 290rpx;
	left: 150rpx;
	transform:rotate(-25deg);
	z-index: 10;
}
.index_2{
	top: 175rpx;
	left: 220rpx;
	z-index: 9;
	transform:rotate(-20deg);
}
.index_3{
	top: 80rpx;
	left: 290rpx;
	z-index: 8;
	transform:rotate(-15deg);
}
.index_4{
	top: 10rpx;
	left: 360rpx;
	z-index: 7;
	transform:rotate(-10deg);
}
.index_5{
	top: -20rpx;
	left: 420rpx;
	z-index: 6;
	transform:rotate(-5deg);
} 
</style>

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/addressList/addressList"],{"0d83":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},3952:function(t,e,i){"use strict";(function(t){i("cc27");n(i("66fd"));var e=n(i("74b0"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"5fed":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(i("70d3")),a=s(i("51e4")),o=s(i("16e9"));function s(t){return t&&t.__esModule?t:{default:t}}var r=function(){i.e("components/Popup").then(function(){return resolve(i("817a"))}.bind(null,i)).catch(i.oe)},d={components:{popup:r},data:function(){return{ifNote:!1,noteData:"",ifhot:!0,letter:"",searchBg:!0,joinBg:!1,questionListHeight:!0,questionText:["你们的班歌是什么","你们班有多少人脱单了","你们班总共聚过几次会","你们班第一次班级聚会是在哪里办的"],currentText:"",ifPopup:!1,supers:"",usersData:[{id:"A",children:[]},{id:"B",children:[]},{id:"C",children:[]},{id:"D",children:[]},{id:"E",children:[]},{id:"F",children:[]},{id:"G",children:[]},{id:"H",children:[]},{id:"I",children:[]},{id:"J",children:[]},{id:"K",children:[]},{id:"L",children:[]},{id:"M",children:[]},{id:"N",children:[]},{id:"O",children:[]},{id:"P",children:[]},{id:"Q",children:[]},{id:"R",children:[]},{id:"S",children:[]},{id:"T",children:[]},{id:"U",children:[]},{id:"V",children:[]},{id:"W",children:[]},{id:"X",children:[]},{id:"Y",children:[]},{id:"Z",children:[]},{id:"*",children:[]}],outputData:[],count:0,wordArr:[],queId:0,answer:"",startX:"",moveX:"",personalId:"",touchPersonal:"",classCode:"",disUserInfo:!1,activeinfo:{}}},onLoad:function(t){wx.showShareMenu({withShareTicket:!0})},methods:{bgCloseUserInfo:function(t){t.currentTarget.id===t.target.id&&(this.disUserInfo=!1)},popupUserInfo:function(t){this.disUserInfo=!0,this.activeinfo=t},closeUserInfo:function(){this.disUserInfo=!1},invi:function(){},changeClass:function(){var t=this;console.log(this.touchPersonal),n.default.getRequest("/class/user/role",{uid:this.touchPersonal.uid,role:1,enable:!0},(function(e){console.log(e),200===e.data.code?(o.default.note("转让成功",t),t.supers=!1,n.default.getRequest("/user/profile",{},(function(e){200===e.data.code&&(getApp().globalData.personal=e.data.data,t.personalInfoData=e.data.data)}),(function(t){console.log(t)}),"GET")):o.default.note(e.data.msg,t),t.touchPersonal.left="left: 0rpx;"}),(function(t){console.log(t)}),"PUT")},moveOut:function(){var t=this;console.log(this.touchPersonal.uid),n.default.getRequest("/class/user",{uid:this.touchPersonal.uid},(function(e){console.log(e),200===e.data.code?(o.default.note("移出成功",t),t.outputData=[],t.wordArr=[],t.usersData=[{id:"A",children:[]},{id:"B",children:[]},{id:"C",children:[]},{id:"D",children:[]},{id:"E",children:[]},{id:"F",children:[]},{id:"G",children:[]},{id:"H",children:[]},{id:"I",children:[]},{id:"J",children:[]},{id:"K",children:[]},{id:"L",children:[]},{id:"M",children:[]},{id:"N",children:[]},{id:"O",children:[]},{id:"P",children:[]},{id:"Q",children:[]},{id:"R",children:[]},{id:"S",children:[]},{id:"T",children:[]},{id:"U",children:[]},{id:"V",children:[]},{id:"W",children:[]},{id:"X",children:[]},{id:"Y",children:[]},{id:"Z",children:[]},{id:"*",children:[]}],n.default.getRequest("/class/users",{},(function(e){console.log(e),t.count=e.data.data.length;for(var i=0;i<e.data.data.length;i++){var n=t.getFirstWord(e.data.data[i].profile.name),a=!1,o={left:"left:0rpx;"};o.qq=e.data.data[i].profile.qq,o.wechat=e.data.data[i].profile.wechat,o.uid=e.data.data[i].profile.uid,o.name=e.data.data[i].profile.name,o.img=e.data.data[i].profile.avatar,o.phone=e.data.data[i].profile.phone;for(var s=0;s<t.usersData.length;s++)n===t.usersData[s].id&&(a=!0,t.usersData[s].children.push(o));a||t.usersData[26].children.push(o)}for(i=0;i<t.usersData.length;i++)t.usersData[i].children.length>0&&(t.wordArr.push(t.usersData[i].id),t.outputData.push(t.usersData[i]))}),(function(t){console.log("err",t)}))):o.default.note(e.data.msg,t),t.touchPersonal.left="left: 0rpx;"}),(function(t){console.log(t)}),"DELETE")},touchstart:function(t){1===t.touches.length&&(this.startX=t.touches[0].pageX)},touchmove:function(t){if(1===t.touches.length&&this.supers){""!=this.touchPersonal&&(this.touchPersonal.left="left: 0rpx;"),this.moveX=this.startX-t.touches[0].pageX;var e=t.currentTarget.dataset.parent.charCodeAt()-65,i=t.currentTarget.dataset.index,n=this.usersData[e].children[i];this.touchPersonal=n,console.log(n),n.uid!=this.personalId&&(0===this.moveX||this.moveX<0?n.left="left: 0rpx;":this.moveX>0&&(n.left="left: -200rpx;"))}},toLetter:function(t){this.letter=t},changeSet:function(){this.ifPopup=!0},closeSet:function(){this.ifPopup=!1},changeJoin:function(){this.joinBg=!this.joinBg},changesearch:function(){this.searchBg=!this.searchBg},choice:function(t){this.currentText=this.questionText[t],this.queId=t},selectQuestion:function(){this.questionListHeight=!this.questionListHeight},getFirstWord:function(t){return a.default.pinyinUtil.getFirstLetter(t).slice(0,1).toUpperCase()},saveSet:function(){var t=this,e={};e.visible=this.searchBg,e.direct=this.joinBg,this.joinBg||(e.question=this.queId+1,e.answer=this.answer),this.joinBg||""!==this.answer?n.default.getRequest("/class/profile",e,(function(i){200===i.data.code?(o.default.note("设置成功",t),wx.setStorageSync("classJoinInfo",e),t.ifPopup=!1):o.default.note(i.data.msg,t)}),(function(t){console.log(t)}),"PUT","application/x-www-form-urlencoded"):o.default.note("答案不能为空",this)}},onShareAppMessage:function(e){if(console.log(e),"button"===e.from)return t.report("class_invivita","邀请加入班级"),{title:"快来加入我的班级吧",path:"/pages/index/index?share=true&code="+this.classCode+"&classId="+this.classId}},mounted:function(){var t=this;if(""!=wx.getStorageSync("classJoinInfo")){var e=wx.getStorageSync("classJoinInfo");this.searchBg=e.visible,this.joinBg=e.direct,this.joinBg||(this.queId=e.question-1),console.log(wx.getStorageSync("classJoinInfo"))}"code"===wx.getStorageSync("bgColor")?this.ifhot=!1:this.ifhot=!0,this.supers=getApp().globalData.personal.permission.super,this.personalId=getApp().globalData.personal.uid,this.classId=getApp().globalData.personal.class.id,this.supers&&n.default.getRequest("/class/invitation",{id:this.classId},(function(e){200===e.data.code?t.classCode=e.data.data.code:o.default.note("获取邀请码失败",t)}),(function(t){console.log(t)}),"POST"),this.currentText=this.questionText[0],n.default.getRequest("/class/users",{},(function(e){t.count=e.data.data.length;for(var i=0;i<e.data.data.length;i++){var n=t.getFirstWord(e.data.data[i].profile.name),a=!1,o={left:"left:0rpx;"};o.qq=e.data.data[i].profile.qq,o.wechat=e.data.data[i].profile.wechat,o.uid=e.data.data[i].profile.uid,o.name=e.data.data[i].profile.name,o.img=e.data.data[i].profile.avatar,o.phone=e.data.data[i].profile.phone;for(var s=0;s<t.usersData.length;s++)n===t.usersData[s].id&&(a=!0,t.usersData[s].children.push(o));a||t.usersData[26].children.push(o)}for(i=0;i<t.usersData.length;i++)t.usersData[i].children.length>0&&(t.wordArr.push(t.usersData[i].id),t.outputData.push(t.usersData[i]))}),(function(t){console.log("err",t)}))}};e.default=d}).call(this,i("543d")["default"])},"74b0":function(t,e,i){"use strict";i.r(e);var n=i("0d83"),a=i("e2cb");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("846b");var s,r=i("f0c5"),d=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=d.exports},"846b":function(t,e,i){"use strict";var n=i("8698"),a=i.n(n);a.a},8698:function(t,e,i){},e2cb:function(t,e,i){"use strict";i.r(e);var n=i("5fed"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a}},[["3952","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/Personal"],{1295:function(t,a,n){},"2c3d":function(t,a,n){"use strict";var o={"uni-popup":function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"c5f4"))}},e=function(){var t=this,a=t.$createElement;t._self._c},s=[];n.d(a,"b",(function(){return e})),n.d(a,"c",(function(){return s})),n.d(a,"a",(function(){return o}))},"468e":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=s(n("60fa")),e=s(n("1a6b"));function s(t){return t&&t.__esModule?t:{default:t}}var i=function(){n.e("components/Popup").then(function(){return resolve(n("60a7"))}.bind(null,n)).catch(n.oe)},l=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(function(){return resolve(n("c5f4"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/uni-popup/uni-popup-dialog").then(function(){return resolve(n("3f16"))}.bind(null,n)).catch(n.oe)},u={components:{popup:i,uniPopup:l,uniPopupDialog:c},props:{login:Boolean},data:function(){return{ifedit:!1,classData:"暂无",schoolData:"暂无",qq:"",phone:"",wechat:"",name:"",personalInfoData:"",ifhot:!0,ifNote:!1,noteData:"",classLink:"../addressList/addressList"}},methods:{toChange:function(a){t.navigateTo({url:"../addressList/addressList"}),a()},confirmQuit:function(t){var a=this;o.default.getRequest("/class",{},(function(t){200===t.data.code?(e.default.note("退出成功",a),a.ifedit=!1,o.default.getRequest("/user/profile",{},(function(t){200===t.data.code&&(getApp().globalData.personal=t.data.data,a.personalInfoData=t.data.data)}),(function(t){console.log(t)}),"GET"),a.$emit("classChange",!1),a.classData="暂无",a.schoolData="暂无"):e.default.note(t.data.msg,a)}),(function(t){console.log(t)}),"DELETE"),t()},editInfo:function(){this.ifedit=!0},confirmInfo:function(){var t=this;this.ifedit=!1,o.default.getRequest("/user/profile",{name:this.name,phone:this.phone,qq:this.qq,wechat:this.wechat},(function(a){200===a.data.code?(e.default.note("修改成功",t),o.default.getRequest("/user/profile",{},(function(a){200===a.data.code&&(getApp().globalData.personal=a.data.data,t.personalInfoData=a.data.data)}),(function(t){console.log(t)}),"GET")):e.default.note(a.data.msg,t)}),(function(t){console.log(t)}),"PUT")},quite:function(){var t=this,a=getApp().globalData.personal.permission.super;a?this.$refs.quite.open():o.default.getRequest("/class",{},(function(a){console.log(a),200===a.data.code?(e.default.note("退出成功",t),t.ifedit=!1,t.classLink="",o.default.getRequest("/user/profile",{},(function(a){200===a.data.code&&(getApp().globalData.personal=a.data.data,t.personalInfoData=a.data.data)}),(function(t){console.log(t)}),"GET"),t.$emit("classChange",!1),t.classData="暂无",t.schoolData="暂无"):e.default.note(a.data.msg,t)}),(function(t){console.log(t)}),"DELETE")},cancelChange:function(){this.ifedit=!1,this.phone=this.personalInfoData.phone,this.qq=this.personalInfoData.qq,this.wechat=this.personalInfoData.wechat,this.name=this.personalInfoData.name}},mounted:function(){"code"===wx.getStorageSync("bgColor")?this.ifhot=!1:this.ifhot=!0,console.log(this.login),this.login?(this.personalInfoData=getApp().globalData.personal,this.phone=this.personalInfoData.phone,this.qq=this.personalInfoData.qq,this.wechat=this.personalInfoData.wechat,this.name=this.personalInfoData.name,null!=this.personalInfoData.class?(this.classData=this.personalInfoData.class.name,this.schoolData=this.personalInfoData.class.university):this.classLink="#"):this.$emit("toLogin",!1)},watch:{login:function(){console.log("watch",this.login),console.log("watch",getApp().globalData.personal),this.personalInfoData=getApp().globalData.personal,this.phone=this.personalInfoData.phone,this.qq=this.personalInfoData.qq,this.wechat=this.personalInfoData.wechat,this.name=this.personalInfoData.name,null!=this.personalInfoData.class?(this.classData=this.personalInfoData.class.name,this.schoolData=this.personalInfoData.class.university):this.classLink="#"}}};a.default=u}).call(this,n("543d")["default"])},"4bb8":function(t,a,n){"use strict";var o=n("1295"),e=n.n(o);e.a},7168:function(t,a,n){"use strict";n.r(a);var o=n("2c3d"),e=n("ab77");for(var s in e)"default"!==s&&function(t){n.d(a,t,(function(){return e[t]}))}(s);n("4bb8");var i,l=n("f0c5"),c=Object(l["a"])(e["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);a["default"]=c.exports},ab77:function(t,a,n){"use strict";n.r(a);var o=n("468e"),e=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(a,t,(function(){return o[t]}))}(s);a["default"]=e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/Personal-create-component',
    {
        'components/Personal-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7168"))
        })
    },
    [['components/Personal-create-component']]
]);

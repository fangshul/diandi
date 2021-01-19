import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

App.mpType = 'app'
// var gio = require("gio-minp/index.js").default;
// gio('init', 'a0eaa60ddb2a4b3f', 'wxc807752b1586987a', { version: '6.12',vue: Vue });

const app = new Vue({
	...App
})
app.$mount()

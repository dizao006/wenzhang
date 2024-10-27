// #ifndef VUE3
// Vue 2 的代码保持不变
import Vue from 'vue'
import App from './App'
import store from "./store/index"
import './uni.promisify.adaptor'

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App
})
app.use(store).$mount()
// #endif

// #ifdef VUE3
// Vue 3 的代码修改如下
import {
	createSSRApp
} from 'vue'
import App from './App'
import store from "./store/index"

export function createApp() {
	const app = createSSRApp(App)
	app.use(store) // 安装 Vuex store
	return {
		app
	}
}
// #endif
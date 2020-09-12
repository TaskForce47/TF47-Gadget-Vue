import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store, { RootState } from './store';
import vuetify from '@/plugins/vuetify';
import { Store } from 'vuex';
import './registerServiceWorker';
// @ts-ignore
import VJsf from '@koumoul/vjsf/lib/VJsf.js'
import '@koumoul/vjsf/lib/VJsf.css'
import '@koumoul/vjsf/lib/deps/third-party.js'

Vue.component('VJsf', VJsf)
Object.defineProperty(Vue.prototype, '$tstore', {
	get: function() {
		return this.$store as Store<RootState>;
	},
	enumerable: true,
});
Vue.config.productionTip = false;
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');

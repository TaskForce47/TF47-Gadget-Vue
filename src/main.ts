import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store, { RootState } from './store';
import vuetify from '@/plugins/vuetify';
import { Store } from 'vuex';
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

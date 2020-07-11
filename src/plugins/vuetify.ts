import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			dark: {
				primary: '#2C3139',
				accent: '#BA2F13',
				secondary: '#131416',
				success: '#4CAF50',
				info: '#EDEDED',
				warning: '#FB8C00',
				error: '#FF5252',
				background: '#2C3139',
				backgroundTop: '#131416',
				gadgetText: '#FF4600',
			},
			light: {
				primary: '#1976D2',
				accent: '#e91e63',
				secondary: '#30b1dc',
				success: '#4CAF50',
				info: '#2196F3',
				warning: '#FB8C00',
				error: '#FF5252',
				background: '#FFFFFF',
				backgroundTop: '#FFFFFF',
				gadgetText: '#FF4600',
			},
		},
	},
});

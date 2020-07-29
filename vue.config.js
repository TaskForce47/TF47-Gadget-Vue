// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

module.exports = {
	transpileDependencies: ['vuetify'],
	devServer: {
		disableHostCheck: true,
		https: {
			key: fs.readFileSync('./certs/taskforce47.com+4-key.pem'),
			cert: fs.readFileSync('./certs/taskforce47.com+4.pem'),
		},
		public: 'https://gadget.taskforce47.com:8080',
	},
	pwa: {
		name: 'Task Force 47 Gadget',
		description: 'Task Force 47 Statistics an Administration Tool',
		themeColor: '#2C3139',
		background_color: '#2C3139',
		manifestOptions: {
			short_name: 'TF47 Gadget'
		},
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: 'src/service-worker.js'
		}
	}
};

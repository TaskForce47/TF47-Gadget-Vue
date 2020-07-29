import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
	snackbar: { showing: boolean; text: string; type: string; timeout: string; timestamp: number };
	auth: { loggedIn: boolean; roles: Array<string> };
	globalRowsPerTable: Array<number>;
}

export default new Vuex.Store<RootState>({
	state: {
		snackbar: { showing: false, text: '', type: 'success', timeout: '5000', timestamp: Date.now() },
		auth: { loggedIn: false, roles: [] },
		globalRowsPerTable: [10, 15, 20, 25, 30, 35, 40, 45, 50],
	},
	mutations: {
		SET_SNACKBAR(state, snackbar) {
			state.snackbar = snackbar;
			let notifications = [];
			const tmp = localStorage.getItem('notifications');
			if (tmp) {
				notifications = JSON.parse(tmp);
			}
			snackbar.timestamp = Date.now();
			notifications.push(snackbar);
			localStorage.setItem('notifications', JSON.stringify(notifications));
		},
		SET_LOGGEDIN(state, loggedIn) {
			state.auth.loggedIn = loggedIn;
		},
		SET_ROLES(state, roles) {
			state.auth.roles = roles;
		},
	},
	actions: {
		setSnackbar({ commit }, snackbar) {
			commit('SET_SNACKBAR', snackbar);
		},
		setLoggedIn({ commit }, loggedIn) {
			commit('SET_LOGGEDIN', loggedIn);
		},
		setRoles({ commit }, roles) {
			commit('SET_ROLES', roles);
		},
	},
	modules: {},
});

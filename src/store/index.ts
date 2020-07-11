import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
	snackbar: { showing: boolean; text: string; type: string; timeout: string };
	auth: { loggedIn: boolean; roles: Array<string> };
}

export default new Vuex.Store<RootState>({
	state: {
		snackbar: { showing: false, text: '', type: 'success', timeout: '5000' },
		auth: { loggedIn: false, roles: [] },
	},
	mutations: {
		SET_SNACKBAR(state, snackbar) {
			state.snackbar = snackbar;
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

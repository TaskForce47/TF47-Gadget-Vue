import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
Vue.use(VueRouter);

function beforeRouteEnter(to: any, from: any, next: (s?: string) => void) {
	if (
		store.state.auth.loggedIn &&
		(store.state.auth.roles.includes('Moderator') || store.state.auth.roles.includes('Admin'))
	) {
		next();
	} else {
		store.state.snackbar.type = 'error';
		store.state.snackbar.showing = true;
		store.state.snackbar.text = 'You do not have permission to access this route';
		next('/');
	}
}

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Dashboard',
		component: () => import('../views/Dashboard.vue'),
	},
	{
		path: '/statistics/events',
		component: () => import('../views/Events.vue'),
		children: [
			{
				path: '/',
				name: 'EventTable',
				component: () => import('../components/events/event-table.vue'),
			},
			{
				path: ':id',
				name: 'oo',
				component: () => import('../views/Events.vue'),
				props: true,
			},
		],
	},
	{
		path: '/administration',
		name: 'Administration',
		component: () => import('../views/Administration.vue'),
		beforeEnter: beforeRouteEnter,
		children: [
			{
				path: 'playermanager',
				name: 'PlayerManager',
				component: () => import('../views/PlayerManager.vue'),
				children: [
					{
						path: ':id',
						component: () => import('../components/playermanager/PlayerProfile.vue'),
					},
				],
			},
			{
				path: 'squadmanager',
				name: 'Squadmanager',
				component: () => import('../views/Squadmanager.vue'),
			},
			{
				path: 'squadmanager/:id',
				name: 'Squad',
				component: () => import('../views/Squad.vue'),
			},
			{
				path: 'logs',
				name: 'Logs',
				component: () => import('../views/Logs.vue'),
			},
		],
	},
	{
		path: '/user',
		name: 'User',
		component: () => import('../views/User.vue'),
	},
];

const router = new VueRouter({
	routes,
	mode: 'history',
});

export default router;

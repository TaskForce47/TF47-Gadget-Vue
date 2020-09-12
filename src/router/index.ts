import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import { authenticate, getRoles } from '@/services/user';
Vue.use(VueRouter);

function beforeRouteEnter(to: any, from: any, next: (s?: string) => void) {
	authenticate().then((authenticated: boolean) => {
		getRoles().then((roles: Array<string>) => {
			if (authenticated && (roles.includes('Moderator') || roles.includes('Admin'))) {
				next();
			} else {
				store.state.snackbar.type = 'error';
				store.state.snackbar.showing = true;
				store.state.snackbar.text = 'You do not have permission to access this route';
				next('/');
			}
		});
	});
}

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Dashboard',
		component: () => import('../views/Dashboard.vue'),
	},
	{
		path: '/planning',
		name: 'Planning',
		component: () => import('../views/Planning.vue'),
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
				component: () => import('../views/SquadManager.vue'),
				children: [
					{
						path: '',
						name: 'SquadTable',
						component: () => import('../components/squadmanager/SquadTable.vue'),
					},
					{
						path: ':id',
						name: 'Squad',
						component: () => import('../components/squadmanager/Squad.vue'),
					},
				],
			},
			{
				path: 'logs',
				name: 'Logs',
				component: () => import('../views/Logs.vue'),
			},
			{
				path: 'whitelist-overview',
				name: 'Whitelist Overview',
				component: () => import('../views/WhitelistOverview.vue'),
			},
			{
				path: 'server-control',
				component: () => import('../views/ServerControl.vue'),
				children: [
					{
						path: '',
						name: 'Server Overview',
						component: () => import('../views/ServerControl/ServerOverview.vue'),
					},
					{
						path: ':id',
						name: 'Server Detail',
						component: () => import('../views/ServerControl/Server.vue'),
					},
				],
			}
		],
	},
	{
		path: '/gallery',
		component: () => import('../views/Gallery.vue'),
		children: [
			{
				path: '',
				name: 'Image Overview',
				component: () => import('../views/Gallery/ImageOverview.vue'),
			},
			{
				path: ':id',
				name: 'ImageDetail',
				component: () => import('../views/Gallery/ImageDetailview.vue'),
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

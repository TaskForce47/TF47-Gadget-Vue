import { fetchJSON } from './utils';
import { IUserDetails, PlayerUid } from '@/services/utils/models';

export async function authenticate(): Promise<boolean> {
	return await fetchJSON('user/authenticate', { method: 'GET' }, true);
}

export async function getRoles(): Promise<Array<string>> {
	return await fetchJSON('user/getRoles', { method: 'GET' });
}

export async function getUserDetails(): Promise<IUserDetails> {
	return await fetchJSON('user/getUserDetails', { method: 'GET' });
}

export async function setUserPlayerUid(objPlayerUid: PlayerUid): Promise<boolean> {
	return await fetchJSON(`user/setUserPlayerUid`, { method: 'PUT', body: JSON.stringify(objPlayerUid) }, true);
}

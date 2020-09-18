import { fetchJSON } from './utils';
import { GetSquad, IUserDetails, PlayerUid, WhitelistSelf } from '@/models/models';

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

export async function getSquads(): Promise<Array<GetSquad>> {
	return await fetchJSON('user/getSquads', { method: 'GET' });
}

export async function leaveSquad(squadId: number): Promise<boolean> {
	return await fetchJSON(`squad/${squadId}/leave`, { method: 'POST' }, true);
}

export async function getWhitelist(): Promise<Array<WhitelistSelf>> {
	return await fetchJSON('user/getWhitelist', { method: 'GET' });
}

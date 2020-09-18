import {
	AvailableWhitelist,
	PlayerByWhitelist,
	WhitelistAllPlayers,
	WhitelistPlayer,
	WhitelistPlayerAdd,
} from '@/models/models';
import { fetchJSON } from '@/services/utils';

export async function getPlayerWhitelist(playerId: number): Promise<Array<WhitelistPlayer>> {
	return await fetchJSON(`whitelist/${playerId}/getWhitelist`, { method: 'GET' });
}

export async function applyWhitelist(objWhitelist: Array<WhitelistPlayerAdd>): Promise<boolean> {
	return await fetchJSON(`whitelist/whitelistUser`, { method: 'PUT', body: JSON.stringify(objWhitelist) }, true);
}

export async function getAvailableWhitelist(): Promise<Array<AvailableWhitelist>> {
	return await fetchJSON(`whitelist/getAvailableWhitelist`, { method: 'GET' });
}

export async function getWhitelistAllUser(): Promise<Array<WhitelistAllPlayers>> {
	return await fetchJSON(`whitelist/getWhitelistAllUser`, { method: 'GET' });
}

export async function getUserByWhitelist(page: number, rows: number, whitelistId: number): Promise<PlayerByWhitelist> {
	return await fetchJSON(`whitelist/GetUserByWhitelist/${page}?rows=${rows}&WhitelistId=${whitelistId}`, {
		method: 'GET',
	});
}

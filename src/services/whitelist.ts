import { WhitelistPlayer, WhitelistPlayerAdd } from '@/services/utils/models';
import { fetchJSON } from '@/services/utils';

export async function getPlayerWhitelist(playerId: number): Promise<Array<WhitelistPlayer>> {
	return await fetchJSON(`whitelist/${playerId}/getWhitelist`, { method: 'GET' });
}

export async function applyWhitelist(objWhitelist: Array<WhitelistPlayerAdd>): Promise<boolean> {
	return await fetchJSON(`whitelist/whitelistUser`, { method: 'PUT', body: JSON.stringify(objWhitelist) }, true);
}

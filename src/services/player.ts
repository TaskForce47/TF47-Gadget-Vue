import { BannedUntil, NoteAddUpdate, Player, PlayerNotes, PlayerStats } from '@/services/utils/models';
import { fetchJSON } from '@/services/utils';

export async function getAllPlayers(): Promise<Array<Player>> {
	return await fetchJSON(`player/getAllPlayers`, { method: 'GET' });
}

export async function getPlayerDetails(playerId: number): Promise<Player> {
	return await fetchJSON(`player/${playerId}/details`, { method: 'GET' });
}

export async function getPlayerNotes(playerId: number): Promise<PlayerNotes> {
	return await fetchJSON(`player/${playerId}/getNotes`, { method: 'GET' });
}

export async function deletePlayer(playerId: number): Promise<boolean> {
	return await fetchJSON(`player/${playerId}/delete`, { method: 'DELETE' }, true);
}

export async function getPlayerStats(playerId: number): Promise<PlayerStats> {
	return await fetchJSON(`player/${playerId}/stats`, { method: 'GET' });
}

export async function banPlayer(playerId: number, bannedUntilObj: BannedUntil): Promise<boolean> {
	return await fetchJSON(`player/${playerId}/ban`, { method: 'POST', body: JSON.stringify(bannedUntilObj) }, true);
}

export async function unbanPlayer(playerId: number): Promise<boolean> {
	return await fetchJSON(`player/${playerId}/pardon`, { method: 'POST' }, true);
}

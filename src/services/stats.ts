import { ChatLatest, PlayerStats, TicketsLatest } from '@/models/models';
import { fetchJSON } from '@/services/utils';

export async function getLatestTicketChanges(page: number): Promise<TicketsLatest> {
	return await fetchJSON(`stats/TicketLog/${page}`, { method: 'GET' });
}

export async function getLatestChat(
	page: number,
	playerName: string | undefined,
	channel: string,
	rows: number
): Promise<ChatLatest> {
	return await fetchJSON(`stats/chat/${page}?channel=${channel}&playerName=${playerName}&rows=${rows}`, {
		method: 'GET',
	});
}

export async function getStatsForPlayer(playerID: number): Promise<PlayerStats> {
	return await fetchJSON(`player/${playerID}/stats`, { method: 'GET' });
}

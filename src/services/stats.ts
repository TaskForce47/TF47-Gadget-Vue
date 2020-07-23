import { ChatLatest, LatestNotes, SquadXML, TicketsLatest } from '@/services/utils/models';
import { fetchJSON } from '@/services/utils';

export async function getLatestTicketChanges(page: number): Promise<TicketsLatest> {
	return await fetchJSON(`stats/TicketLog/${page}`, { method: 'GET' });
}

export async function getLatestChat(page: number): Promise<ChatLatest> {
	return await fetchJSON(`stats/chat/${page}`, { method: 'GET' });
}

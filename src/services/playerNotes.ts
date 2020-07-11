import { NoteAddUpdate, NotesLatest, PlayerNotes } from '@/services/utils/models';
import { fetchJSON } from '@/services/utils';

export async function addPlayerNote(objPlayerNote: NoteAddUpdate): Promise<boolean> {
	return await fetchJSON(`playerNotes/addNote`, { method: 'PUT', body: JSON.stringify(objPlayerNote) }, true);
}

export async function updatePlayerNote(playerNoteId: number, objPlayerNote: PlayerNotes): Promise<boolean> {
	return await fetchJSON(
		`playerNotes/${playerNoteId}/update`,
		{ method: 'PUT', body: JSON.stringify(objPlayerNote) },
		true
	);
}

export async function deletePlayerNote(playerNoteId: number): Promise<boolean> {
	return await fetchJSON(`playerNotes/${playerNoteId}/delete`, { method: 'DELETE' }, true);
}

export async function getLatestNotes(): Promise<Array<NotesLatest>> {
	return await fetchJSON(`playerNotes/getLatest`, { method: 'GET' });
}

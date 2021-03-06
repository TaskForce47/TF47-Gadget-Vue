import { LatestNotes, NoteAddUpdate, NotesEntity } from '@/models/models';
import { fetchJSON } from '@/services/utils';

export async function addPlayerNote(objPlayerNote: NoteAddUpdate): Promise<boolean> {
	return await fetchJSON(`playerNotes/addNote`, { method: 'PUT', body: JSON.stringify(objPlayerNote) }, true);
}

export async function updatePlayerNote(
	playerNoteId: number | undefined,
	objPlayerNote: NotesEntity | undefined
): Promise<boolean> {
	return await fetchJSON(
		`playerNotes/${playerNoteId}/update`,
		{ method: 'PUT', body: JSON.stringify(objPlayerNote) },
		true
	);
}

export async function deletePlayerNote(playerNoteId: number | undefined): Promise<boolean> {
	return await fetchJSON(`playerNotes/${playerNoteId}/delete`, { method: 'DELETE' }, true);
}

export async function getLatestNotes(page: number, moderatorName: string, playerName: string): Promise<LatestNotes> {
	return await fetchJSON(`playerNotes/getLatest/${page}?authorName=${moderatorName}&playerName${playerName}`, {
		method: 'GET',
	});
}

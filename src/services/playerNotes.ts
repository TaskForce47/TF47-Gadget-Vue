import { LatestNotes, NoteAddUpdate, NotesEntity } from '@/services/utils/models';
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

export async function getLatestNotes(page: number): Promise<LatestNotes> {
	return await fetchJSON(`playerNotes/getLatest/${page}`, { method: 'GET' });
}

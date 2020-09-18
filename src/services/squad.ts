import { fetchJSON, uploadFile } from '@/services/utils';
import { SquadI, SquadCreate, SquadMemberAdd, SquadMemberUpdate, SquadUpdate, SquadXML } from '@/models/models';

export async function getSquads(): Promise<Array<SquadI>> {
	return await fetchJSON('squad/getSquads', { method: 'GET' });
}

export async function getSquad(squadId: number): Promise<SquadI> {
	return await fetchJSON(`squad/${squadId}`, { method: 'GET' });
}

export async function deleteSquad(squadId: number): Promise<boolean> {
	return await fetchJSON(`squad/${squadId}`, { method: 'DELETE' }, true);
}

export async function createSquad(squadObj: SquadCreate): Promise<boolean> {
	return await fetchJSON(`squad/createSquad`, { method: 'PUT', body: JSON.stringify(squadObj) }, true);
}

export async function updateSquad(squadId: number, squadObj: SquadUpdate | undefined): Promise<boolean> {
	return await fetchJSON(`squad/${squadId}/update`, { method: 'POST', body: JSON.stringify(squadObj) }, true);
}

export async function uploadSquadPicture(squadId: number, data: FormData): Promise<boolean> {
	return await uploadFile(`squad/${squadId}/uploadSquadPicture`, { method: 'POST', body: data, headers: [] }, true);
}

export async function getSquadXML(squadId: number): Promise<SquadXML> {
	return await fetchJSON(`squad/${squadId}/getSquadXml`, { method: 'GET' });
}

export async function rebuildSquadXml(squadId: number): Promise<boolean> {
	return await fetchJSON(`squad/${squadId}/rebuild`, { method: 'POST' }, true);
}

export async function rebuildAllSquadXml(): Promise<boolean> {
	return await fetchJSON(`squad/rebuildAllSquadXml`, { method: 'POST' }, true);
}

export async function addSquadMember(squadId: number | undefined, memberObj: SquadMemberAdd): Promise<boolean> {
	return await fetchJSON(`squad/${squadId}/addSquadMember`, { method: 'PUT', body: JSON.stringify(memberObj) }, true);
}

export async function removeSquadMember(squadId: number, memberObj: SquadMemberAdd): Promise<boolean> {
	return await fetchJSON(
		`squad/${squadId}/removeSquadMember`,
		{ method: 'DELETE', body: JSON.stringify(memberObj) },
		true
	);
}

export async function updateSquadMember(squadId: number, memberObj: SquadMemberUpdate): Promise<boolean> {
	return await fetchJSON(
		`squad/${squadId}/updateSquadMember`,
		{ method: 'POST', body: JSON.stringify(memberObj), headers: { 'Content-Type': 'image/png' } },
		true
	);
}

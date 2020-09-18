import { fetchJSON } from '@/services/utils';
import { GadgetUser } from '@/models/models';

export async function getGadgetUser(gadgetUserId: number): Promise<GadgetUser> {
	return await fetchJSON(`gadgetUser/${gadgetUserId}`, { method: 'GET' });
}

export async function getAllGadgetUser(): Promise<Array<GadgetUser>> {
	return await fetchJSON(`gadgetUser/getAllGadgetUser`, { method: 'GET' });
}

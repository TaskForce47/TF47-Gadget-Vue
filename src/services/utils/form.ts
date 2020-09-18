import { fetchJSON } from '@/services/utils/index';

export async function submitForm(endpoint: string, formData: any): Promise<any> {
	return await fetchJSON(`${endpoint}`, { method: 'POST', body: JSON.stringify(formData) });
}

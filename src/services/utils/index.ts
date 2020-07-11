export const API_URI = 'https://api.taskforce47.com/api/';

import ResponseError from './ResponseError';

export const fetchJSON = async <T>(input: RequestInfo, init: RequestInit = {}, returnBool = false): Promise<T> => {
	const response = await fetch(`${API_URI}${input}`, {
		credentials: 'include',
		...init,
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) throw new ResponseError(response);
	return returnBool ? response.ok : await response.json();
};

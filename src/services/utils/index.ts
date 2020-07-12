export const API_URI = 'https://api.taskforce47.com/api/';

export const fetchJSON = async <T>(input: RequestInfo, init: RequestInit = {}, returnBool = false): Promise<T> => {
	const response = await fetch(`${API_URI}${input}`, {
		credentials: 'include',
		...init,
		headers: { 'Content-Type': 'application/json' },
	});

	return returnBool ? response.ok : await response.json();
};

export const uploadFile = async <T>(input: RequestInfo, init: RequestInit = {}, returnBool = false): Promise<T> => {
	const response = await fetch(`${API_URI}${input}`, {
		credentials: 'include',
		...init
	});

	return returnBool ? response.ok : await response.json();
};

import UserWhitelist from "@/models/UserWhitelist";
import SetWhitelistUser from "@/models/SetWhitelistUser";
import UserDetails from "@/models/UserDetails";
import AvailableWhitelist from "@/models/AvailableWhitelist";

export const API_URI = "https://api.taskforce47.com/api";

export async function checkIfLoggedIn(): Promise<boolean> {
	const res = await fetch(`${API_URI}/user/authenticate`, {
		credentials: "include",
	});

	return res.ok;
}

const fetchJSON = async (input: RequestInfo, init: RequestInit = {}) => {
	const response = await fetch(input, init);

	if (!response.ok) throw new Error("Response not ok");

	return await response.json();
};

export async function getRoles(): Promise<Array<string>> {
	return await fetchJSON(`${API_URI}/user/getRoles`, {
		credentials: "include",
	});
}

export async function getUserDetails(): Promise<UserDetails> {
	return await fetchJSON(`${API_URI}/user/getUserDetails`, {
		credentials: "include",
	});
}

export async function getAvailableWhitelist(): Promise<AvailableWhitelist[]> {
	return await fetchJSON(`${API_URI}/whitelist/getAvailableWhitelist`, {
		credentials: "include",
	});
}

export async function getWhitelistAllUser(): Promise<UserWhitelist[]> {
	return await fetchJSON(`${API_URI}/whitelist/getWhitelistAllUser`, {
		credentials: "include",
	});
}

export async function applyWhitelist(data: Array<SetWhitelistUser>) {
	const res = await fetch(`${API_URI}/whitelist/whitelistUser`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	});

	if (res.ok) {
		return true;
	} else {
		return false;
	}
}

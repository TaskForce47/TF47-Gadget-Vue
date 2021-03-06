export interface GadgetUser {
	id: number;
	forumName: string;
	avatarUrl: string;
	playerUid?: null;
	roles?: Array<string>;
}

export interface Player {
	isBanned: boolean;
	bannedUntil: string;
	id: number;
	name: string;
	uid: string;
	gadgetUser?: GadgetUser;
}

export interface PlayerNotes {
	playerId: number;
	playerName: string;
	notes?: NotesEntity[] | null;
}
export interface NotesEntity {
	nodeId: number;
	authorId: number;
	authorName: string;
	timeWritten: string;
	note: string;
	type: string;
	isModified: boolean;
	lastTimeModified?: null;
}

export interface LatestNotes {
	totalNoteCount: number;
	notes?: NotesEntity[] | null;
}

export interface PlayerStats {
	id: number;
	playerName: string;
	playerUid: string;
	playerNameFirstConnect: string;
	playerFirstTimeSeen: string;
	lastTimeSeen: string;
	timePlayedTotal: number;
	timePlayedBase: number;
	timePlayedObjective: number;
	timePlayedInfantry: number;
	timePlayedVehicleSmall: number;
	timePlayedVehicleTracked: number;
	timePlayedVehicleHelicopter: number;
	timePlayedVehiclePlane: number;
	killsInfantry: number;
	killsVehicleSmall: number;
	killsVehicleTracked: number;
	killsVehicleHelicopter: number;
	killsVehiclePlane: number;
	deathsInfantry: number;
	deathsVehicleSmall: number;
	deathsVehicleTracked: number;
	deathsVehicleHelicopter: number;
	deathsVehiclePlane: number;
}

export interface NoteAddUpdate {
	note: string;
	playerId: number;
	type: string;
}

export interface SquadI {
	id: number;
	squadNick: string;
	squadName: string;
	squadEmail: string;
	squadWeb: string;
	squadHasPicture?: boolean;
	squadTitle: string;
	squadUsers?: (SquadUsersEntity | null)[] | null;
}
export interface SquadUsersEntity {
	userId: number;
	userSquadNick: string;
	userSquadName: string;
	userSquadEmail: string;
	userSquadIcq: string;
	userSquadRemark: string;
}

export interface SquadCreate {
	squadNick: string;
	squadName: string;
	squadEmail: string;
	squadWeb: string;
	squadTitle: string;
}

export interface SquadXML {
	squadLink: string;
}

export interface SquadMemberAdd {
	gadgetUserId: number;
}

export interface SquadMemberUpdate {
	gadgetUserId: number;
	email: string;
	remark: string;
}

export interface WhitelistPlayer {
	id: number;
	playerName: string;
	playerUid: string;
	whitelists?: WhitelistsEntity[] | null;
}

export interface WhitelistsEntity {
	id: number;
	whitelistName: string;
	enabled: boolean;
}

export interface WhitelistPlayerAdd {
	playerId: number;
	whitelistId: number;
	enabled: boolean;
}

export interface IUserDetails {
	forumId: number;
	profileName: string;
	avatar: string;
	roles?: string[] | null;
	playerUid: string;
}

export interface SquadUpdate {
	squadNick: string;
	squadTitle: string;
	squadEmail: string;
	squadWeb: string;
}

export interface PlayerUid {
	playerUid: string;
}

export interface BannedUntil {
	bannedUntil: string;
}

export interface ChatLatest {
	totalChatCount: number;
	chats?: ChatsEntity[] | null;
}
export interface ChatsEntity {
	id: number;
	channel: string;
	message: string;
	timeSend: string;
	playerId: number;
	playerName: string;
	sessionId: number;
	missionId: number;
	missionName: string;
	missionType: string;
}

export interface TicketsLatest {
	totalTicketCount: number;
	ticketLog?: TicketLogEntity[] | null;
}
export interface TicketLogEntity {
	id: number;
	ticketChange: number;
	ticketNow: number;
	message: string;
	ticketChangeTime: string;
	sessionId: number;
	missionId: number;
	missionName: string;
	missionType: string;
}

export interface GetSquad {
	squadId: number;
	squadNick: string;
	squadTitle: string;
	squadEmail: string;
	squadWeb: string;
	squadHasPicture: boolean;
	remark: string;
	email: string;
}

export interface WhitelistSelf {
	whitelistingId: number;
	playerId: number;
	playerName: string;
	id: number;
	description: string;
}

declare module '*.json' {
	const value: any;
	export default value;
}

export interface AvailableWhitelist {
	id: number;
	description: string;
}

export interface WhitelistAllPlayers {
	id: number;
	playerName: string;
	playerUid: string;
	whitelists?: WhitelistsEntity[] | null;
}

export interface WhitelistsEntity {
	id: number;
	whitelistName: string;
	enabled: boolean;
}

export interface PlayerByWhitelist {
	totalUsersWithWhitelist?: number;
	usersByWhitelist?: UsersByWhitelistEntity[] | null;
}

export interface UsersByWhitelistEntity {
	id: number;
	playerId: number;
	playerName: string;
	whitelistId: number;
	description: string;
}

export interface PlayerStats {
	id: number;
	playerName: string;
	playerUid: string;
	playerNameFirstConnect: string;
	playerFirstTimeSeen: string;
	lastTimeSeen: string;
	numberConnections: number;
	timePlayedTotal: number;
	timePlayedBase: number;
	timePlayedObjective: number;
	timePlayedInfantry: number;
	timePlayedVehicleSmall: number;
	timePlayedVehicleTracked: number;
	timePlayedVehicleHelicopter: number;
	timePlayedVehiclePlane: number;
	killsInfantry: number;
	killsVehicleSmall: number;
	killsVehicleTracked: number;
	killsVehicleHelicopter: number;
	killsVehiclePlane: number;
	deathsInfantry: number;
	deathsVehicleSmall: number;
	deathsVehicleTracked: number;
	deathsVehicleHelicopter: number;
	deathsVehiclePlane: number;
	isBanned: boolean;
	bannedUntil?: null;
}

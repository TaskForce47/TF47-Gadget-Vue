export default interface UserDetails {
    forumId: number,
    profileName: string,
    avatar: string,
    roles: Array<string>,
    playerUid: number|null;
}

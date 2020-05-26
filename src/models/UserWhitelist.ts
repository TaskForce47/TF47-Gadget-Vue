import WhitelistUserArr from "@/models/WhitelistUserArr";

export default interface UserWhitelist {
  id: number;
  playerName: string;
  playerUid: string;
  whitelists: WhitelistUserArr[];
}

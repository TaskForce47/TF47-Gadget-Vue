<template>
	<div>
		<v-form>
			<v-row class="ma-2">
				<v-col cols="12" md="5">
					<h2>Server options</h2>
					<v-divider></v-divider>
					<v-text-field v-model="serverConfig.serverName" label="Name"></v-text-field>
					<v-text-field v-model="serverConfig.password" type="password" label="Server Password"></v-text-field>
					<v-text-field
						v-model="serverConfig.passwordAdmin"
						type="password"
						label="Admin Password"
					></v-text-field>
					<v-text-field
						v-model="serverConfig.serverCommandPassword"
						type="password"
						label="Server Command Password"
					></v-text-field>
					<v-text-field v-model="serverConfig.maxPlayer" label="Max Player"></v-text-field>
					<v-checkbox color="accent" v-model="serverConfig.kickDuplicate" label="Kick duplicate"></v-checkbox>
					<v-checkbox
						color="accent"
						v-model="serverConfig.verifySignatures"
						label="Verify Signatures"
					></v-checkbox>
					<v-checkbox
						color="accent"
						v-model="serverConfig.allowedFilePatching"
						label="Allow File Patching"
					></v-checkbox>
					<v-text-field
						v-model="serverConfig.filePatchingExceptions"
						label="File Patching Exceptions"
						v-if="serverConfig.allowedFilePatching"
					></v-text-field>

					<v-text-field v-model="serverConfig.maxMemory" label="Max Memory"></v-text-field>
					<v-text-field v-model="serverConfig.cpuCount" label="CPU Count"></v-text-field>
					<v-text-field v-model="serverConfig.exThreads" label="ExThreads"></v-text-field>
					<v-text-field v-model="serverConfig.malloc" label="Malloc"></v-text-field>
					<v-checkbox color="accent" v-model="serverConfig.noLogs" label="Disable Logs"></v-checkbox>
					<v-checkbox
						color="accent"
						v-model="serverConfig.enableHyperThreading"
						label="Enable HyperThreading"
					></v-checkbox>
					<v-checkbox color="accent" v-model="serverConfig.hugePages" label="Enable Huge Pages"></v-checkbox>
					<v-checkbox
						color="accent"
						v-model="serverConfig.filePatching"
						label="Enable File Patching"
					></v-checkbox>
					<v-checkbox
						color="accent"
						v-model="serverConfig.loadMissionToMemory"
						label="Load Mission to Memory"
					></v-checkbox>
					<v-checkbox color="accent" v-model="serverConfig.autoInit" label="Enable Auto Init"></v-checkbox>
					<v-checkbox
						color="accent"
						v-model="serverConfig.bandWidthAlg"
						label="Enable Bandwidth Algorithm"
					></v-checkbox>

					<h2 class="mt-6">Timeouts</h2>
					<v-divider></v-divider>
					<v-text-field v-model="serverConfig.disconnectTimeout" label="Disconnect Timeout"></v-text-field>
					<v-text-field v-model="serverConfig.maxDesync" label="Maximum Desync"></v-text-field>
					<v-text-field v-model="serverConfig.maxPing" label="Maximum Ping"></v-text-field>
					<v-text-field v-model="serverConfig.maxPacketLoss" label="Maximum Packet Loss"></v-text-field>

					<h2 class="mt-6">Socket Config</h2>
					<v-divider></v-divider>
					<v-text-field v-model="serverConfig.socketMaxPacketSize" label="Maximum Packet Size"></v-text-field>
					<v-text-field v-model="serverConfig.socketInitBandwidth" label="Init Bandwidth"></v-text-field>
					<v-text-field v-model="serverConfig.socketMinBandwidth" label="Minimum Bandwidth"></v-text-field>
					<v-text-field v-model="serverConfig.socketMaxBandwidth" label="Maximum Bandwidth"></v-text-field>

					<h2 class="mt-6">Network Settings</h2>
					<v-divider></v-divider>
					<v-text-field v-model="serverConfig.maxMsgSend" label="Maximum Message Send"></v-text-field>
					<v-text-field v-model="serverConfig.maxSizeGuaranteed" label="Maximum Size Guaranteed"></v-text-field>
					<v-text-field
						v-model="serverConfig.maxSizeNonGuaranteed"
						label="Maximum Size Non Guaranteed"
					></v-text-field>
					<v-text-field v-model="serverConfig.minBandwidth" label="Minimum Bandwidth"></v-text-field>
					<v-text-field v-model="serverConfig.maxBandwidth" label="Maxmum Bandwidth"></v-text-field>
					<v-text-field v-model="serverConfig.minErrorToSend" label="Minimum Error To Send"></v-text-field>
					<v-text-field
						v-model="serverConfig.minErrorToSendNear"
						label="Minimum Error To Send Near"
					></v-text-field>
					<v-text-field
						v-model="serverConfig.maxCustomFileSize"
						label="Maximum Custom File Size"
					></v-text-field>
					<v-text-field
						v-model="serverConfig.steamProtocolMaxDataSize"
						label="Steam Protocol Max Data Size"
					></v-text-field>
				</v-col>
				<v-col cols="0" md="2"></v-col>
				<v-col cols="12" md="5">
					<h2>Ingame settings</h2>
					<v-divider></v-divider>
					<v-checkbox color="accent" v-model="serverConfig.disableVon" label="Disable VoN"></v-checkbox>
					<v-checkbox color="accent" v-model="serverConfig.vonCodec" label="VoN Codec"></v-checkbox>
					<v-text-field v-model="serverConfig.vonCodecQuality" label="VoN Codec Quality"></v-text-field>
					<v-checkbox color="accent" v-model="serverConfig.persistent" label="Enable Persistence"></v-checkbox>
					<v-checkbox color="accent" v-model="serverConfig.battleye" label="Enable Battleye"></v-checkbox>
					<v-text-field v-model="serverConfig.timeStampFormat" label="Time Stamp Format"></v-text-field>
					<v-text-field
						v-model="serverConfig.allowedLoadFileExtensions"
						label="Allowed Load File Extensions"
					></v-text-field>
					<v-text-field
						v-model="serverConfig.allowedPreprocessFileExtensions"
						label="Allowed Preprocess File Extensions"
					></v-text-field>
					<v-text-field
						v-model="serverConfig.allowedHtmlLoadExtensions"
						label="Allowed HTML Load Extensions"
					></v-text-field>

					<h2 class="mt-6">Voting</h2>
					<v-divider></v-divider>
					<v-text-field v-model="serverConfig.voteMissionPlayers" label="Needed Players"></v-text-field>
					<v-text-field v-model="serverConfig.voteThreshold" label="Vote Threshold"></v-text-field>

					<h2 class="mt-6">Difficulty</h2>
					<v-divider></v-divider>
					<v-text-field v-model="serverConfig.difficulty" label="Difficulty"></v-text-field>
					<template v-if="serverConfig.difficulty === 'custom'">
						<v-checkbox
							color="accent"
							v-model="serverConfig.reducedDamage"
							label="Enable Reduced Damage"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.groupIndicator"
							label="Enable Group Indicator"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.friendlyTag"
							label="Enable Friendly Tag"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.detectMines"
							label="Enable Detect Mines"
						></v-checkbox>
						<v-checkbox color="accent" v-model="serverConfig.commands" label="Enable Commands"></v-checkbox>
						<v-checkbox color="accent" v-model="serverConfig.waypoints" label="Enable Waypoints"></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.weaponInfo"
							label="Enable Weapon Info"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.weaponIndicator"
							label="Enable Weapon Indicator"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.weaponCrosshair"
							label="Enable Weapon Crosshair"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.staminaBar"
							label="Enable Stamina Bar"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.visionAid"
							label="Enable Vision Aid"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.thirdPerson"
							label="Enable Third Person"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.cameraShake"
							label="Enable Camera Shake"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.scoreTable"
							label="Enable Score Table"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.deathMessages"
							label="Enable Death Messages"
						></v-checkbox>
						<v-checkbox color="accent" v-model="serverConfig.vonId" label="Enable VoN ID"></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.mapContent"
							label="Enable Map Content"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.autoReport"
							label="Enable Auto Reporting"
						></v-checkbox>
						<v-checkbox
							color="accent"
							v-model="serverConfig.multipleSaves"
							label="Enable Multiple Saves"
						></v-checkbox>
						<v-text-field v-model="serverConfig.aiLevelPreset" label="AI Level Preset"></v-text-field>
						<v-text-field v-model="serverConfig.skillAi" label="AI Skill"></v-text-field>
						<v-text-field v-model="serverConfig.precisionAi" label="AI Precision"></v-text-field>
						<v-text-field v-model="serverConfig.viewDistance" label="View Distance"></v-text-field>
						<v-text-field
							v-model="serverConfig.preferredObjectViewDistance"
							label="Preferred Object View Distance"
						></v-text-field>
					</template>
				</v-col>
			</v-row>
		</v-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ServerConfigurationForm extends Vue {
	private serverConfig = {
		serverName: '',
		passwordAdmin: '',
		password: '',
		serverCommandPassword: '',
		maxPlayer: 0,
		kickDuplicate: false,
		verifySignatures: false,
		allowedFilePatching: false,
		filePatchingExceptions: [],
		disableVon: false,
		vonCodec: false,
		vonCodecQuality: 0,
		timeStampFormat: '',
		persistent: false,
		battleye: false,
		allowedLoadFileExtensions: [],
		allowedPreprocessFileExtensions: [],
		allowedHtmlLoadExtensions: [],
		maxMemory: 0,
		cpuCount: 1,
		exThreads: 1,
		malloc: '',
		noLogs: false,
		enableHyperThreading: false,
		hugePages: false,
		filePatching: false,
		loadMissionToMemory: false,
		autoInit: false,
		bandWidthAlg: false,
		voteMissionPlayers: 0,
		voteThreshold: 0.0,
		disconnectTimeout: 0,
		maxDesync: 0,
		maxPing: 1000,
		maxPacketLoss: 0,
		lobbyIdleTimeout: 0,
		socketMaxPacketSize: 0,
		socketInitBandwidth: 0,
		socketMinBandwidth: 0,
		socketMaxBandwidth: 0,
		difficulty: '',
		reducedDamage: false,
		groupIndicator: false,
		friendlyTag: false,
		detectMines: false,
		commands: false,
		waypoints: false,
		weaponInfo: false,
		weaponIndicator: false,
		staminaBar: false,
		weaponCrosshair: false,
		visionAid: false,
		thirdPerson: false,
		cameraShake: false,
		scoreTable: false,
		deathMessages: false,
		vonId: false,
		mapContent: false,
		autoReport: false,
		multipleSaves: false,
		aiLevelPreset: 0,
		skillAi: 0,
		precisionAi: 0,
		preferredObjectViewDistance: 0,
		viewDistance: 0,
		maxMsgSend: 0,
		maxSizeGuaranteed: 0,
		maxSizeNonGuaranteed: 0,
		minBandwidth: 0,
		maxBandwidth: 0,
		minErrorToSend: 0.0,
		maxCustomFileSize: 0,
		minErrorToSendNear: 0.0,
		steamProtocolMaxDataSize: 0,
	};
}
</script>

<style scoped></style>

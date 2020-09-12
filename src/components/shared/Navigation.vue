<template>
	<div>
		<template v-if="!burger">
			<template v-for="(navlink, index) in navigationLink.links">
				<template
					v-if="
						navlink.roles.length === 0 ||
							$tstore.state.auth.roles.some(role => navlink.roles.indexOf(role) >= 0)
					"
				>
					<template v-if="navlink && navlink.name.length === 0">
						<v-tooltip :key="index" bottom>
							<template v-slot:activator="{ on }">
								<v-btn :to="navlink.to" min-width="0" text v-on="on">
									<v-icon>{{ navlink.icon }}</v-icon>
								</v-btn>
							</template>
							<span>{{ navlink.tooltip }}</span>
						</v-tooltip>
					</template>

					<template v-if="navlink && navlink.name.length > 0 && navlink.sublinks.length === 0">
						<v-btn :to="navlink.to" min-width="0" text :key="index">
							<span>{{ navlink.name }}</span>
						</v-btn>
					</template>
					<template v-if="navlink && navlink.sublinks && navlink.sublinks.length > 0">
						<v-menu
							open-on-hover
							offset-y
							:key="index"
							v-if="
								navlink.roles.length === 0 ||
									$tstore.state.auth.roles.some(role => navlink.roles.indexOf(role) >= 0)
							"
						>
							<template v-slot:activator="{ on }">
								<v-btn color="info" text dark v-on="on">
									{{ navlink.name }}
								</v-btn>
							</template>
							<v-list dense>
								<v-list-item-group>
									<template v-for="(sublink, sublinkIndex) in navlink.sublinks">
										<v-list-item
											:key="sublinkIndex"
											:to="sublink.to"
											v-if="
												sublink.roles.length === 0 ||
													$tstore.state.auth.roles.some(
														role => sublink.roles.indexOf(role) >= 0
													)
											"
										>
											<v-list-item-icon>
												<v-icon>{{ sublink.icon }}</v-icon>
											</v-list-item-icon>
											<v-list-item-content>
												<v-list-item-title>{{ sublink.name }}</v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</template>
								</v-list-item-group>
							</v-list>
						</v-menu>
					</template>
				</template>
			</template>
		</template>
		<template v-if="burger">
			<v-btn icon @click="showMenu = true">
				<v-icon>mdi-menu</v-icon>
			</v-btn>
			<v-navigation-drawer
				app
				right
				absolute
				v-model="showMenu"
				style="margin-top: 60px"
				color="backgroundTop"
				width="85%"
			>
				<v-list nav>
					<template v-for="(navlink, index) in navigationLink.links">
						<template
							v-if="
								navlink.roles.length === 0 ||
									$tstore.state.auth.roles.some(role => navlink.roles.indexOf(role) >= 0)
							"
						>
							<template v-if="navlink && navlink.tooltip">
								<v-list-item :key="index" :to="navlink.to">
									<v-list-item-icon>
										<v-icon>{{ navlink.icon }}</v-icon>
									</v-list-item-icon>

									<v-list-item-title>{{ navlink.tooltip }}</v-list-item-title>
								</v-list-item>
							</template>
						</template>
						<template v-if="navlink && navlink.sublinks && navlink.sublinks.length > 0">
							<v-list
								:key="index"
								v-if="
									navlink.roles.length === 0 ||
										$tstore.state.auth.roles.some(role => navlink.roles.indexOf(role) >= 0)
								"
							>
								<v-list-group no-action value="true" class="text-wrap" color="info">
									<template v-slot:activator>
										<v-list-item-title>{{ navlink.name }}</v-list-item-title>
									</template>
									<template v-for="(sublink, sublinkIndex) in navlink.sublinks">
										<v-list-item
											:key="sublinkIndex"
											:to="sublink.to"
											link
											v-if="
												sublink.roles.length === 0 ||
													$tstore.state.auth.roles.some(
														role => sublink.roles.indexOf(role) >= 0
													)
											"
										>
											<v-list-item-icon>
												<v-icon>{{ sublink.icon }}</v-icon>
											</v-list-item-icon>
											<v-list-item-title>{{ sublink.name }}</v-list-item-title>
										</v-list-item>
									</template>
								</v-list-group>
							</v-list>
						</template>
					</template>
				</v-list>
			</v-navigation-drawer>
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import navigationLinks from './../../assets/navigation.json';
@Component
export default class Navigation extends Vue {
	private navigationLink = navigationLinks;
	private burger: boolean = false;
	private showMenu: boolean = false;
	private getDimensions() {
		if (document.body.clientWidth <= 960) {
			this.burger = true;
		} else {
			this.burger = false;
		}
	}
	constructor() {
		super();
		window.addEventListener('resize', () => {
			this.getDimensions();
		});
	}
	mounted() {
		this.getDimensions();
	}
}
</script>

<style scoped></style>

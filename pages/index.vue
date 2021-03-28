<template>
	<section
		class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20"
	>
		<div class="flex flex-col w-full lg:w-1/2">
			<Profile />
			<CompletedChallenges />
			<!-- v-on: -->
			<Countdown @completed="getNewChallenge" />
			<!-- v-if serve para mostrar ou nao uma tag na pagina -->
			<button v-if="hasCountdownCompleted" disabled class="button completed">
				Cycle completed
			</button>
			<button
				v-else-if="isCountdownActive"
				class="button abandon"
				@click="setCountdownState(false)"
			>
				Abandon cycle
			</button>
			<button v-else class="button start" @click="setCountdownState(true)">
				Start a cycle
			</button>
		</div>
		<Card id="challenge" class="w-full lg:w-1/2" />
	</section>
</template>

<script lang="ts">
import Vue from "vue";

// mutação é uma função que modifica o nosso estado
import { mapState, mapGetters, mapMutations } from "vuex";
import { Mutations as ChallengesMT } from "~/store/Challenges/types";
import { Mutations as CountdownMT } from "~/store/Countdown/types";

import CompletedChallenges from "~/components/atoms/CompletedChallenges.vue";
import Profile from "~/components/molecules/Profile.vue";
import Countdown from "~/components/molecules/Countdown.vue";
import Card from "~/components/organisms/Card.vue";

import {
	scrollToElement,
	getRandomNumber,
	playAudio,
	sendNotification
} from "~/utils";

interface Head {
	title: string;
}

export default Vue.extend({
	head(): Head {
		// editar de forma dinamica a pagina colocando de forma string o que foi passado na criação no componente a cima
		return {
			title: "Home | movue.it"
		};
	},
	components: {
		CompletedChallenges,
		Countdown,
		Profile,
		Card
	},
	mounted() {
		if ("Notification" in window) {
			Notification.requestPermission();
		}
	},
	// estados precisam estar dentro da computed para se tornar reativo
	computed: {
		...mapState("Countdown", {
			// mapear o estado, mas mudar a chave dele, para algo mais semantico
			hasCountdownCompleted: "hasCompleted",
			isCountdownActive: "isActive"
		}),
		...mapGetters("Challenges", ["challengesLength"])
	},
	methods: {
		...mapMutations({
			setCountdownHasCompleted: `Countdown/${CountdownMT.SET_HAS_COMPLETED}`,
			setCountdownIsActive: `Countdown/${CountdownMT.SET_IS_ACTIVE}`,
			setCurrentChallengeIndex: `Challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX}`
		}),
		setCountdownState(flag: boolean) {
			this.setCountdownHasCompleted(false);
			this.setCountdownIsActive(flag);
		},
		getNewChallenge() {
			// numero totais de itens que tenho
			const index = getRandomNumber(0, this.challengesLength);
			this.setCountdownHasCompleted(true);
			this.setCurrentChallengeIndex(index);
			// colocando o ? antes, verificamos se a notification é valida antes de acessar o campo permission
			if (Notification?.permission === "granted") {
				playAudio("/notification.mp3");
				sendNotification("New Challenge!", {
					body: "A new challenge has started! Go complete it!",
					icon: "/favicon.png"
				});
			}
			// espera o que eu to fazendo e da proxima vez tu faz isso
			this.$nextTick(() => {
				scrollToElement("#challenge");
			});
		}
	}
});
</script>

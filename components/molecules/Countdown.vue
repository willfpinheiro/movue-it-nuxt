<template>
	<div
		class="flex justify-center items-center mt-8 lg:mt-14 text-9xl text-title font-rajdhani"
	>
		<CountdownDigits :digits="minutes" />
		<span class="bg-background px-2">:</span>
		<CountdownDigits :digits="seconds" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import { mapState, mapGetters, mapMutations } from "vuex";
import { Mutations } from "~/store/Countdown/types";

import CountdownDigits from "~/components/atoms/CountdownDigits.vue";

let TIMEOUT_REFERENCE: ReturnType<typeof setTimeout>;

export default Vue.extend({
	components: { CountdownDigits },
	computed: {
		...mapState("Countdown", ["time", "isActive"]),
		...mapGetters("Countdown", ["minutes", "seconds"])
	},
	methods: {
		...mapMutations("Countdown", {
			setTime: Mutations.SET_TIME,
			resetTime: Mutations.RESET_TIME
		}),
		// em verdo estou criando funcoes
		// to criando um contador e se clicar para parar ele ira parar de forma automatica
		// e como o watch fica observando para sempre saber se ta rodando ou nao
		runCountdown(flag: boolean) {
			if (this.isActive && flag) {
				TIMEOUT_REFERENCE = setTimeout(() => {
					this.setTime(this.time - 1);
				}, 1000);
			} else {
				clearTimeout(TIMEOUT_REFERENCE);
			}
		}
	},
	watch: {
		isActive(newValue: boolean) {
			this.runCountdown(newValue);

			if (!newValue) {
				this.resetTime();
			}
		},
		// quando atualizar o time, continuar chamando o conutdiown
		time(newValue: number) {
			if (newValue > 0) {
				this.runCountdown(true);
			} else {
				// diz pro pai que o evento ta completo
				this.$emit("completed");
			}
		}
	}
});
</script>

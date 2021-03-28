import { State, Getters, Mutations, MutationsInterface } from './types';

const MINUTES = 25;
// sempre funçções para evitar problemas
export const state = (): State => ({
	time: MINUTES * 60, //em segundos
	isActive: false,
	hasCompleted: false,
});
// objetos
export const getters: Getters = {
	minutes: state => Math.floor(state.time / 60),
	seconds: state => state.time % 60,
};
// objetos
export const mutations: MutationsInterface = {
	[Mutations.SET_TIME] (state, newTime) {
		state.time = newTime;
	},
	[Mutations.RESET_TIME] (state) {
		state.time = MINUTES * 60;
	},
	[Mutations.SET_IS_ACTIVE] (state, isActive) {
		state.isActive = isActive;
	},
	[Mutations.SET_HAS_COMPLETED] (state, hasCompleted) {
		state.hasCompleted = hasCompleted;
	},
};

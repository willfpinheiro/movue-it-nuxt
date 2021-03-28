import { MutationTree } from 'vuex';

export interface State {
	// armazenar tempo do countdown
	time: number;
	// ja comecou ou nao
	isActive: boolean;
	// terminou ou nao
	hasCompleted: boolean;
}
// getters servem para acessar o estado e retornar de uma forma modificada
export interface Getters {
	minutes: (state: State) => number;
	seconds: (state: State) => number;
}
// para modificar o estado eu tenho que modificar o estado, nao posso simplismente modificar
export enum Mutations {
	SET_TIME = 'SET_TIME',
	RESET_TIME = 'RESET_TIME',
	SET_IS_ACTIVE = 'SET_IS_ACTIVE',
	SET_HAS_COMPLETED = 'SET_HAS_COMPLETED',
}

export type RootState = ReturnType<() => State>

export interface MutationsInterface extends MutationTree<RootState> {
	// nome da função, os parametros e o tipo de retorno
	[Mutations.SET_TIME](s: State, p: number): void;
	[Mutations.RESET_TIME](s: State): void;
	[Mutations.SET_IS_ACTIVE](s: State, p: boolean): void;
	[Mutations.SET_HAS_COMPLETED](s: State, p: boolean): void;
}

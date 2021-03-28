import { Mutations } from './Challenges/types';
// feito dessa forma por conta da documentação, 
export const actions = { 
	//				 store ----- conterxto
	nuxtServerInit ({ commit }: any, { app }: any) {
		const cookie = app.$cookiz.get('movueit');

		if (cookie) {
			commit(`Challenges/${Mutations.SAVE_COOKIE_DATA}`, cookie);
		}
	},
};

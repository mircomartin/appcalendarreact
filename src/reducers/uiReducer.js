import { OPEN_MODAL, CLOSE_MODAL } from './../types/index';

const initialState = {
	modalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				modalOpen: true,
			};
		case CLOSE_MODAL:
			return {
				...state,
				modalOpen: false,
			};
		default:
			return state;
	}
};

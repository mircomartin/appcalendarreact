import {
	EVENT_ADD_NEW,
	EVENT_SET_ACTIVE,
	EVENTS_LIST,
	EVENT_CLEAR_ACTIVE,
	EVENT_UPDATED,
	EVENT_DELETED,
	CLEAN_CALENDAR
} from './../types/index';

const initialState = {
	events: [],
	activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case EVENT_ADD_NEW:
			return {
				...state,
				events: [...state.events, action.payload],
			};
		case EVENT_SET_ACTIVE:
			return {
				...state,
				activeEvent: action.payload,
			};
		case EVENTS_LIST:
			return {
				...state,
				events: [...action.payload],
			};
		case EVENT_CLEAR_ACTIVE:
			return {
				...state,
				activeEvent: null,
			};
		case EVENT_UPDATED:
			return {
				...state,
				events: state.events.map((event) =>
					event.id === action.payload.id ? action.payload : event,
                ),
			};
		case EVENT_DELETED:
			return {
				...state,
                events: state.events.filter((event) => event.id !== state.activeEvent.id),
                activeEvent: null,
			};
		case CLEAN_CALENDAR:
			return {
				...initialState
			}
		default:
			return state;
	}
};

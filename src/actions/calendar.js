import Swal from 'sweetalert2';
import {
	EVENT_ADD_NEW,
	EVENT_SET_ACTIVE,
	EVENTS_LIST,
    EVENT_CLEAR_ACTIVE,
    EVENT_UPDATED,
	EVENT_DELETED,
	CLEAN_CALENDAR
} from './../types/index';
import { fetchConToken } from '../helpers/token';
import { prepareEvents } from '../helpers/prepareEvents';

//Async
export const startEventAddNew = (event) => {
	return async (dispatch, getState) => {

		const {uid, name} = getState().auth;

		try {

			const resp = await fetchConToken('events', event, 'POST');
			const body = await resp.json();

			if (body.ok) {
				event.id = body.evento.id
				event.user = {
					_id: uid,
					name: name
				}

				dispatch(eventAddNew(event));
			} 
		} catch (error) {
			console.log(error)
		}
			
	};
};

export const startListEvents = () => {
	return async (dispatch) => {
		try {
			const resp = await fetchConToken('events');
			const body = await resp.json();

			const events = prepareEvents ( body.eventos );

			dispatch(listEvents(events));
			
		} catch (error) {
			console.log(error);
		}
	};
};

export const startEventUpdated = (event) => {
	return async (dispatch) => {
		try {

			const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
			const body = await resp.json();

			if (body.ok) {
				dispatch(eventUpdated(event));
			} else {
				Swal.fire('Error', body.msg, 'error')
			}

			
		} catch (error) {
			console.log(error);
		}
	};
};

export const startEventDeleted = () => {
	return async (dispatch, getState) => {
		const { activeEvent } = getState().calendar
		try {

			const resp = await fetchConToken(`events/${activeEvent.id}`, {}, 'DELETE')
			const body = await resp.json();

			if (body.ok) {
				dispatch(eventDeleted());
			} else {
				Swal.fire('Error', body.msg, 'error')
			}

		} catch (error) {
			console.log(error);
		}
	};
};

//Noasync functions
export const eventAddNew = (event) => ({
	type: EVENT_ADD_NEW,
	payload: event,
});

export const eventSetActive = (event) => ({
	type: EVENT_SET_ACTIVE,
	payload: event,
});

export const eventClearActive = () => ({
	type: EVENT_CLEAR_ACTIVE,
});

export const listEvents = (events) => ({
	type: EVENTS_LIST,
	payload: events,
});

export const eventUpdated = (event) => ({
	type: EVENT_UPDATED,
	payload: event,
});

export const eventDeleted = () => ({
	type: EVENT_DELETED,
});

export const cleanCalendarLogout = () => ({
	type: CLEAN_CALENDAR,
})
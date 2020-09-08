import Swal from 'sweetalert2';

import {
	FINISH_CHECKING_LOGIN,
	//START_LOGIN,
	LOGIN,
	//START_TOKEN_RENEW,
	LOGOUT,
} from './../types/index';
import {clienteAxios} from '../helpers/axios';
import { fetchConToken } from '../helpers/token';
import { cleanCalendarLogout } from './calendar';

export const startLogin = (email, password) => {
	return async (dispatch) => {
		try {
			const { data } = await clienteAxios.post('/auth', { email, password });
			const resp = data;

			localStorage.setItem('token', resp.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: resp.uid,
					name: resp.name,
				}),
			);
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.response.data.msg, 'error');
		}
	};
};

export const startRegisterUser = (email, name, password) => {
	return async (dispatch) => {
		try {
			const { data } = await clienteAxios.post('/auth/new', {
				email,
				name,
				password,
			});
			const resp = data;

			localStorage.setItem('token', resp.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: resp.uid,
					name: resp.name,
				}),
			);
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.response.data.msg, 'error');
		}
	};
};

export const startChecking = () => {
	return async (dispatch) => {

		/* try {
			const { data } = await clienteAxios.get('/auth/renew');
			console.log(data)
			const resp = data;

			localStorage.setItem('token', resp.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: resp.uid,
					name: resp.name,
				}),
			);
		} catch (error) {
			console.log(error);
		}
 */

		const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        
		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());

			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				}),
			);
		} else {
			dispatch(finishChecking());
		}
	};
};

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
		dispatch(cleanCalendarLogout())
		dispatch(logout());

    }
}


//no async functions
export const login = (user) => ({
	type: LOGIN,
	payload: user,
});

export const logout = () => ({
	type: LOGOUT,
});

export const finishChecking = () => ({
	type: FINISH_CHECKING_LOGIN,
});

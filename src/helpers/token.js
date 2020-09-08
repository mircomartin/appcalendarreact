/* import clienteAxios from './axios'

export const tokenAuth = token => {
    if(token){
        clienteAxios.defaults.headers.common['x-auth-token'] = token
    }else{
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
} */

export const fetchConToken = (endpoint, data, method = 'GET') => {
    const baseURL = process.env.REACT_APP_API_URL;

    const url = `${baseURL}/${endpoint}`;
    const token = localStorage.getItem('token') || ''

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }, 
        });
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}


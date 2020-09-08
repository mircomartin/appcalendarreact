import axios from 'axios'

export const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

/* export const clienteAxios2 = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 1000,
    headers: { 'x-token' : localStorage.getItem('token')}
  }); */

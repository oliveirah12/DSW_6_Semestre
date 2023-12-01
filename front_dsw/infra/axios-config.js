import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:4000/'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    console.log(token)

    if (!!token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config

}, (error) => {
    return Promise.reject(error)
})
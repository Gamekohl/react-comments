import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
});

export const makeRequest = async (url: string, options?: Partial<AxiosRequestConfig<any>>): Promise<any> => {
    return api(url, options)
        .then(res => res.data)
        .catch(err => {
            return Promise.reject(err?.response?.data?.message ?? "Error");
        })
}
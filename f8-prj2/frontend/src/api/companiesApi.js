import axiosClient from "./axiosClient";


export const companiesApi = {
    getAll: () => axiosClient.get('/companies')
}
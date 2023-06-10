import { City } from "@/interfaces/user.interface";
import { api } from "./api";

const basePath = '/address/city';

const getAllCities = () => api.get<City[]>(basePath).then(res => res.data);
const getOneCity = (id: number) => api.get<City>(`${ basePath }/${ id }`).then(res => res.data);
const getCitiesByProvince = (provinceId: number) => api.get<City[]>(`${ basePath }/province/${ provinceId }`).then(res => res.data);
const createCity = (city: City) => api.post<any>(basePath, city).then(res => res).catch(console.log);
const updateCity = (id: number, city: City) => api.patch<City>(`${ basePath }/${ id }`, city).then(res => res.data);
const deleteCity = (id: number) => api.delete(`${ basePath }/${ id }`).then(res => res.data);

export default {
    getAllCities,
    getOneCity,
    getCitiesByProvince,
    createCity,
    updateCity,
    deleteCity
}
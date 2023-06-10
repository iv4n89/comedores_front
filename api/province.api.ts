import { Province, State } from "@/interfaces/user.interface";
import { api } from "./api";

const basePath = '/address/province';

const getAllProvinces = () => api.get<Province[]>(basePath).then(res => res.data);
const getOneProvince = (id: number) => api.get<Province>(`${ basePath }/${ id }`).then(res => res.data);
const getProvincesByState = (stateId: number) => api.get<Province[]>(`${ basePath }/state/${ stateId }`).then(res => res.data);
const createProvince = (province: Province) => api.post<any>(basePath, province).then(res => res).catch(console.log);
const updateProvince = (id: number, province: Province) => api.patch<Province>(`${ basePath }/${ id }`, province).then(res => res.data);
const deleteProvince = (id: number) => api.delete(`${ basePath }/${ id }`).then(res => res.data);

export default {
    getAllProvinces,
    getOneProvince,
    getProvincesByState,
    createProvince,
    updateProvince,
    deleteProvince
}
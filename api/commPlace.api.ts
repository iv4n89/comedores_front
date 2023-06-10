import { CommPlace, CommPlaceTypeEnum } from "@/interfaces/entity.interface";
import { api } from "./api";

const basePath = '/comm-place';

const getAllPlaces = () => api.get<CommPlace[]>(basePath).then(res => res.data);
const getOnePlace = (id: number) => api.get<CommPlace>(`${ basePath }/${ id }`).then(res => res.data);
const createPlace = (place: CommPlace) => api.post<any>(basePath, place).then(res => res).catch(console.log);
const updatePlace = (id: number, place: CommPlace) => api.patch<CommPlace>(`${ basePath }/${ id }`, place).then(res => res.data);
const deletePlace = (id: number) => api.delete(`${ basePath }/${ id }`).then(res => res.data);
const getKitchens = () => api.post<CommPlace[]>(`${basePath}/search/by/type`, { type: CommPlaceTypeEnum.kitchen }).then(res => res.data);
const getStores = () => api.post<CommPlace[]>(`${basePath}/search/by/type`, { type: CommPlaceTypeEnum.store }).then(res => res.data);

export default {
    getAllPlaces,
    getOnePlace,
    createPlace,
    updatePlace,
    deletePlace,
    getKitchens,
    getStores,
}
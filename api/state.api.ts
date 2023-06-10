import { Entity } from "@/interfaces/entity.interface";
import { State } from "@/interfaces/user.interface";
import { api } from "./api";

const basePath = '/address/state';

const getAllStates = () => api.get<State[]>(basePath).then(res => res.data);
const getOneState = (id: number) => api.get<State>(`${ basePath }/${ id }`).then(res => res.data);
const getStatesByCountry = (countryId: number) => api.get<State[]>(`${ basePath }/country/${ countryId }`).then(res => res.data);
const createState = (state: State) => api.post<any>(basePath, state).then(res => res).catch(console.log);
const updateState = (id: number, state: State) => api.patch<State>(`${ basePath }/${ id }`, state).then(res => res.data);
const deleteState = (id: number) => api.delete(`${ basePath }/${ id }`).then(res => res.data);

export default {
    getAllStates,
    getOneState,
    getStatesByCountry,
    createState,
    updateState,
    deleteState
}
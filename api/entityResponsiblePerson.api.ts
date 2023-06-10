import { EntityResponsiblePerson } from "@/interfaces/entity.interface";
import { api } from "./api";

const basePath = '/comm-person';

const getAllPersons = () => api.get<EntityResponsiblePerson[]>(basePath).then(res => res.data);
const getOnePerson = (id: number) => api.get<EntityResponsiblePerson>(`${ basePath }/${ id }`).then(res => res.data);
const createPerson = (person: EntityResponsiblePerson) => api.post<any>(basePath, person).then(res => res).catch(console.log);
const updatePerson = (id: number, person: EntityResponsiblePerson) => api.patch<EntityResponsiblePerson>(`${ basePath }/${ id }`, person).then(res => res.data);
const deletePerson = (id: number) => api.delete(`${ basePath }/${ id }`).then(res => res.data);

export default {
    getAllPersons,
    getOnePerson,
    createPerson,
    updatePerson,
    deletePerson
}
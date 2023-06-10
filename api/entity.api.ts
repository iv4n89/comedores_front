import { Entity } from "@/interfaces/entity.interface";
import { api } from "./api";

const basePath = '/comm-entity';

const getAllEntitys = () => api.get<Entity[]>(basePath).then(res => res.data);
const getOneEntity = (id: number) => api.get<Entity>(`${ basePath }/${ id }`).then(res => res.data);
const createEntity = (entity: Entity) => api.post<any>(basePath, entity).then(res => res).catch(console.log);
const updateEntity = (id: number, entity: Entity) => api.patch<Entity>(`${ basePath }/${ id }`, entity).then(res => res.data);
const deleteEntity = (id: number) => api.delete(`${ basePath }/${ id }`).then(res => res.data);

export default {
    getAllEntitys,
    getOneEntity,
    createEntity,
    updateEntity,
    deleteEntity
}
import { User } from "@/interfaces/user.interface";
import { api } from "./api";



const basePath = '/user';

const getAllUsers = () => api.get<User[]>(basePath).then(res => res.data);
const getOneUser = (id: number) => api.get<User>(`${ basePath }/${ id }`).then(res => res.data);
const createUser = (user: User) => api.post<any>(basePath, user).then(res => res).catch(console.log);
const updateUser = (id: number, user: User) => api.patch<User>(`${ basePath }/${ id }`, user).then(res => res.data);
const deleteUser = (id: number) => api.delete(`${ basePath }/${ id }`).then(res => res.data);

export default {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}
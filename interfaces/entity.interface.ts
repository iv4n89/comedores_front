import { Address } from "./user.interface";


export interface Entity {
    id: number;
    identifier: string;
    name: string;
    nif: string;
    applicableRate: 0.5 | 0.75 | 2.5;
    person?: EntityResponsiblePerson;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface EntityRequest {
    name: string;
    nif: string;
    applicableRate: 0.5 | 0.75 | 2.5;
}

export interface EntityResponsiblePerson {
    id?: number;
    name: string;
    surname?: string;
    telephone: string;
    entity?: number | Entity;
    responsibleFor?: CommPlace;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CommPlace {
    id?: number;
    name?: string;
    cif: string;
    type?: CommPlaceType;
    address?: Address;
    entity?: Entity[];
    responsiblePerson?: number | EntityResponsiblePerson;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type CommPlaceType = 
    | 'community kitchen'
    | 'company store';

export enum CommPlaceTypeEnum {
    kitchen = 'community kitchen',
    store = 'company store'
}



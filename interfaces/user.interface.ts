

export interface User {
    id: number;
    name: string;
    surname?: string;
    telNumber: string;
    identityDoc?: IdentityDoc;
    address?: Address;
    places?: number[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserPost extends User {
    commPlaceId?: number;
}

export interface IdentityDoc {
    id: number;
    idNumber: string;
    docType: 'DNI' | 'NIE' | 'Passport';
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface Address {
    id: number;
    addrType: string;
    streetName: string;
    streetNumber: string;
    floor?: number;
    door?: string;
    country?: Country;
    state?: State;
    province?: Province;
    city?: City;
    extraInfo?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AddressPost extends Address {
    countryId?: number;
    stateId?: number;
    cityId?: number;
}

export interface Country {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface State {
    id: number;
    name: string;
    country?: Country;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface Province {
    id: number;
    name: string;
    state?: State;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface City {
    id: number;
    name: string;
    postalCode: string;
    province?: Province;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
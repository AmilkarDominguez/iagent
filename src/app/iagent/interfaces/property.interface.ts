import { Department } from './department.interface';
export interface PropertyCreateResponse {
    title: string;
    description: string;
    price: string;
    currency_type: string;
    offer_type: string;
    property_type: string;
    status: string;
    lat: string;
    lon: string;
    total_surface: string;
    length_unit: string;
    id: number;
    created_at: string;
    updated_at: string;
}


// ***  DataTable
export interface Properties {
    items: Property[];
    meta: Meta;
}

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}


export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    currency_type: string;
    offer_type: string;
    property_type: string;
    status: string;
    lat: string;
    lon: string;
    total_surface: number;
    constructed_surface: number;
    length_unit: string;
    property_location: string;
    address: string;
    publication_type: string;
    match_rate: number;
    created_at: Date;
    updated_at: Date;
    rooms: Rooms;
    propertyToFeature: PropertyToFeature[];
    country: Country;
    department: Department;
    media: Media[];
    user: User;
}

export interface Country {
    id: number;
    name: string;
    code: string;
}

export interface Media {
    id: number;
    name: string;
    path: string;
}

export interface PropertyToFeature {
    Id: number;
    propertyId: number;
    featureId: number;
    quantity: number;
    feature: Feature;
}

export interface Feature {
    id: number;
    name: string;
    icon: string;
    weight: number;
    multiple: boolean;
}

export interface Rooms {
    id: number;
    no_bathrooms: number;
    no_bedrooms: number;
}

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone_number: string;
    rol: string;
    created_at: Date;
    updated_at: Date;
}


// ***  End DataTable
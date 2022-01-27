import { Property } from './property.interface'


export interface Logs {
    items: Log[];
    meta: Meta;
}

export interface Log {
    id: number;
    action: string;
    detail: string;
    is_automatic: boolean;
    created_at: Date;
    matched_property_id: string;
    user: User;
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

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}


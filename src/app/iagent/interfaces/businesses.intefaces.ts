export enum BusinessState {
    nuevo, acutual, pasado
}
export enum BusinessType {
    casa, departamemto
}

export interface Business {
    state: string,
    type: string,
    price: number,
}



export enum PropertyType {
    DEPARTAMENTO, CASA, OFICINA, TERRENO, GALPON, LOCAL_COMERCIAL, EDIFICIO
}

export enum OfferType {
    ALQUILER, VENTA, ANTICRETICO
}


export enum PropertyTypeCheck {
    DEPARTAMENTO = 'DEPARTAMENTO',
    CASA = 'CASA',
    OFICINA = 'OFICINA',
    TERRENO = 'TERRENO',
    GALPON = 'GALPON',
    LOCAL_COMERCIAL = 'LOCAL_COMERCIAL',
    EDIFICIO = 'EDIFICIO'
}
export enum OfferTypeCheck {
    ALQUILER = 'ALQUILER',
    VENTA = 'VENTA',
    ANTICRETICO = 'ANTICRETICO'
}
export enum OfferType2 {
    ALQUILER = 'ALQUILER', VENTA = 'VENTA', ANTICRETICO = 'ANTICRETICO'
}


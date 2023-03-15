import { IAuditable } from '@dao/models/IAuditable';

export interface IEvento extends IAuditable{
    codigo: string;
    nombre: string;
    descripción: string;
    ubicación?: string;
    categoría?: string;
}

export const DefaultEvento: IEvento = {
    codigo: '',
    nombre: '',
    descripción: '',
    createdAt: new Date(),
    updatedAt: new Date(),
}


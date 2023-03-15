import { IAuditable } from '@dao/models/IAuditable';
import { ObjectId } from 'mongodb';

export interface IEvento extends IAuditable{
    _id?: ObjectId|string;
    nombre: string;
    descripción: string;
    ubicación?: string;
    categoría?: string;
}

export const DefaultEvento: IEvento = {
    nombre: '',
    descripción: '',
    createdAt: new Date(),
    updatedAt: new Date(),
}


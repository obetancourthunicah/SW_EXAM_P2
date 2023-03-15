import { ObjectId } from 'mongodb';
import {IAuditable} from '../IAuditable';

export interface IEventos extends IAuditable {
    _id?: ObjectId | string;
    nombre: string;
    fecha: Date;
    hora: number;
    descripcion : string;
    ubicacion: string;
    categoria: string;
};

export const DefaultEventos: IEventos = {
    nombre: '',
    fecha: new Date(),
    hora: 0,
    descripcion: '',
    ubicacion: '',
    categoria: '',
    createdAt: new Date(),
    updatedAt: new Date()
}
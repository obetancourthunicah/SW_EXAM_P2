import { IAuditable } from "../IAuditable";

export interface ITareas extends IAuditable {
    codigo: string;
    nombre: string;
    fechavencimiento: Date;
    descripcion:string;
    estado: string;
}

export const DefaultTareas:ITareas={
    createdAt: new Date(),
    updatedAt: new Date(),
    nombre: "",
    fechavencimiento: new Date(),
    descripcion: "",
    estado: "",
    codigo: ""
}
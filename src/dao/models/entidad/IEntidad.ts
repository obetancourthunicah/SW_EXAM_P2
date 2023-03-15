import { IAuditable } from "../IAuditable";

export interface IEntidad extends IAuditable {
    nombre: string;
    correo: string;
    password: string;
}

export const DefaultEntidad: IEntidad = {
    nombre: "",
    correo: "",
    password: "",
    createdAt: new Date(),
    updatedAt: new Date()
};
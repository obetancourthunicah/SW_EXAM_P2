import { ObjectId } from "mongodb";
import { IAuditable } from "@dao/models/IAuditable";

export interface IMusic extends IAuditable {
    _id?: string | ObjectId,
    nombre: string,
    artista: string,
    album: string,
    fechaLanzamiento: Date,
    Url?: string
}

export const DefaultMusic: IMusic = {
    nombre: "",
    artista: "",
    fechaLanzamiento: new Date(),
    album: "",
    Url: "",
    createdAt: new Date(),
    updatedAt: new Date(),

}
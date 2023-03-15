import { ObjectId } from "mongodb";

export interface IVideos {
    _id?: ObjectId | String;
    nombre : String; 
    descripción : String;
    fechaDeCarga : Date;
    URL: String;
}

export const DefaultVideos: IVideos = {
    nombre: "",
    descripción: "",
    fechaDeCarga: new Date(),
    URL: ""
}
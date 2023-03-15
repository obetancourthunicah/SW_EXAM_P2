import { ObjectId } from "mongodb";
import { IAuditable } from "../IAuditable";

export interface IStories extends IAuditable{
  _id?: string| ObjectId;
  nombre: string;
  descripcion: string;
  fecha_carga: Date;
  url: string;
 }

 export const DefaultStories: IStories = {
     _id: "",
     nombre: "",
     descripcion: "",
     fecha_carga: new Date(),
     url: ""
 };

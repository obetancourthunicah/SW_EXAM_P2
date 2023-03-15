import { ObjectId } from "mongodb";
import { IAuditable } from "../IAuditable";

export enum EPlantaState{
  "ACT" = "Active",
  "INA" = "Inactive",
  "BLQ" = "Blocked"
}
export interface IPlanta extends IAuditable{
  _id?: string| ObjectId;
  nombreCientifico: string;
  nombreComun: string;
  descripcion?: string;
  state: EPlantaState;
  roles: string[];
  luzSolar: string;
  riegoRequerido: string;
 }

 export const DefaultPlanta: IPlanta = {
     nombreCientifico: "",
     nombreComun: "",
     state: EPlantaState.ACT,
     roles: ["public"],
     createdAt: new Date(),
     updatedAt: new Date(),
     luzSolar: "",
     riegoRequerido: ""
 };
import {ObjectId} from 'mongodb';
import {IAuditable} from '../IAuditable';

export enum EUserState {
    "ACT"= "Active",
    "INA" = "Inactive",
    "BLQ" = "Blocked",
  
}

export interface IPlanta extends IAuditable {
    _id?: ObjectId | string;
    email: string;
    password: string;
    state: EUserState;
    roles: string[];
    pswExpires: Date;
    lastLogin?: Date;
    avatar?: string;
    }

    export const DefaultUser: IPlanta = {
    email: "",
    password: "",
    state: EUserState.ACT,
    roles: ["public"],
    createdAt: new Date(),
    updatedAt: new Date(),
    pswExpires: new Date()
    };
import {MongoDAOBase} from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { IPlanta } from './IPlanta';

export class UserDao extends MongoDAOBase<IPlanta> {
  constructor(conexion: IDBConnection){
      super("users", conexion);
     
  }
}
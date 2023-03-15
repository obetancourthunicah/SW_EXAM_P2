import {MongoDAOBase} from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { DefaultPlanta, IPlanta } from './IPlantas';
export class PlantasDao extends MongoDAOBase<IPlanta> {
  constructor(conexion: IDBConnection){
      super("plantas", conexion);
  }
  public async create( plantas: Partial<IPlanta>){
    const newPlanta = {...DefaultPlanta, ...plantas};
    return super.create(newPlanta);
  }
}
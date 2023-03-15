import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IUsuario } from "./IUsuarios";

export class EmpresasDao extends MongoDAOBase<IUsuario>{
  init() {
      throw new Error('Method not implemented.');
  }
  constructor(conexion: IDBConnection){
      super("usuarios", conexion);
  }
}
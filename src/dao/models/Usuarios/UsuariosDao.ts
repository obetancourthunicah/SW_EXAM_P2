import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IUsuarios } from "./Usuarios";

export class UsuariosDao extends MongoDAOBase<IUsuarios>{
  constructor(conexion: IDBConnection){
      super("usuarios", conexion);
  }
}

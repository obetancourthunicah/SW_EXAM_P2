import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IProducto } from "./IProductos";

export class ProductosDao extends MongoDAOBase<IProducto>{
  constructor(conexion: IDBConnection){
      super("prodcutos", conexion);
  }
}

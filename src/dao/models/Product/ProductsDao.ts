import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IProduct  } from "./IProducts";

export class ProductsDao extends MongoDAOBase<IProduct>{
  constructor(conexion: IDBConnection){
      super("products", conexion);
  }
}

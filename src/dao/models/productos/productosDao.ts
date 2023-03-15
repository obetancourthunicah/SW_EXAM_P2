import { MongoDAOBase } from '@dao/MongoDAOBase';
import { IDBConnection } from '@server/dao/IDBConnection';
import { IProductos } from './IProductos';

export class UsuariosDao extends MongoDAOBase<IProductos> {
  constructor(conexion: IDBConnection) {
    super('productos', conexion);
  }
}

export interface IProducto {
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  created?: Date;
  updated?: Date;
}

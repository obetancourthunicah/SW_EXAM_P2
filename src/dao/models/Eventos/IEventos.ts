export interface IEvento {
    codigo: string;
    nombre: string;
    fecha: Date;
    hora: Date;
    descripcion: string;
    ubicacion: string;
    categoria: string;
    created?: Date;
    updated?: Date;

  }
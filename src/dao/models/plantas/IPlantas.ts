export interface IPlantas{
    codigo: string;
    nombre_cientifico: string;
    nombre_comun: string;
    descripcion: string;
    cuidados: string;
    luz_solar: string;
    riego_requeridos: string;
    creado?: Date;
    ultimoAcceso?: Date;
    observacion?: string;
}
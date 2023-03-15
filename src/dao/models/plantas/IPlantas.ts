export interface IPlantas{
    nombreCientifico: string;
    nombreComun: string;
    descripcion: string;
    cuidados: string;
    luzSolar: boolean;
    riegoRequeridos?: Date;
    created?: Date;
}

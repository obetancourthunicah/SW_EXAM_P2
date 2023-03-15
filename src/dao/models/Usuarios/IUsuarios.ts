export interface IUsuarios{   
    ID: string,
    nombre:string, 
    correo:string, 
    password: string,
    foto?: any,
    biografia? : string,
    informacion? : string,
    notificacion? : boolean,
    configuracion_Privacidad? : string,
}

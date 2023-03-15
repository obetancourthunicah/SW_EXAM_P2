export interface IEntidad {
    codigo: string;
    descripcion: string;
    ubicacion: string;
    categoria: string;
    status: string;
    fecha?: Date;
    hora?: Date;
    created: Date;
    updated: Date;
  }
  
  export class Entidad {
    private entidad : IEntidad[];
    constructor(){
        this.entidad = [];
    }
    add(nuevaEntidad : IEntidad){
        const date = new Date;
        const nueva: IEntidad = {
            ...nuevaEntidad,
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            created: date,
            updated: date
        }
        this.entidad.push(nueva);
        return true;
    }
    getAll(){
        return this.entidad;
    }
    getById(codigo: string){
        const entidadToReturn = this.entidad.find((ent)=>{
            return ent.codigo === codigo;
        });
        return entidadToReturn;
    }
    update(updateEntidad: IEntidad){ 'updateEntidad'
    const newEntidad: IEntidad[] = this.entidad.map((ent)=>{
        if (ent.codigo === updateEntidad.codigo){
            return{...ent, ...updateEntidad, update: new Date()};
        }
        return ent;
    });
    this.entidad = newEntidad;
    return true;
    }

    delete(codigo: string){
        const entidadToDelete = this.entidad.find((emp)=>{
            return emp.codigo === codigo;
        });
        if(entidadToDelete){
            const newEntidad: IEntidad[] = this.entidad.filter((emp)=>{
                return emp.codigo !== codigo;
            });
            this.entidad = newEntidad;
            return true;
        }
        return false;
    }
}
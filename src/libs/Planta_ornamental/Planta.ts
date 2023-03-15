export interface IPlanta {
    codigo: string;
    nombre_cientifico: string;
    nombre_comun: string;
    descripcion: string;
    cuidados: string;
    luz_zolar: string;
    riesgo_requerido: string;
    created?: Date;
    ultimoacceso?: Date;
 
}
export class Planta {
    private planta : IPlanta[];
    constructor(){
        this.planta = [];
    }
    getAll(){
        return this.planta;
    }
    getById (codigo: string){
        const plantaToReturn = this.planta.filter((plan)=>{
            return plan.codigo === codigo;
        });
        return plantaToReturn;
    }
    add(nuevaPlanta : IPlanta) {
        const date = new Date();
        const nueva: IPlanta = {
            ...nuevaPlanta,
            codigo:(Math.random()* 1000).toString()+new Date().getTime().toString(),
            created: date,
            ultimoacceso: date
        }
        this.planta.push(nueva);
        return true;
    }
    update(updatePplanta: IPlanta){
        const newPlanta: IPlanta[] = this.planta.map((plan)=>{
            if ( plan.codigo === updatePplanta.codigo ){
                return{...plan, ...updatePplanta, updated: new Date}
            }
            return plan;
        });
        this.planta = newPlanta;
        return true;
    }
    delete(codigo: string){
        const plantaToDelete = this.planta.find((plan)=>{
            return plan.codigo === codigo;
        });
        if(plantaToDelete){
            const newPlanta: IPlanta[] = this.planta.filter((plan)=>{
                return plan.codigo !== codigo;
            });
            this.planta = newPlanta;
            return true;
        }
        return false;
    }
}
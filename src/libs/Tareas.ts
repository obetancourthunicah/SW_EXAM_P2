export interface ITarea {
    codigo: string;
    nombre: string;
    fechavencimiento: Date;
    descripcion: string;
    estadofinalizacion?: string;
}




export class Tareas {
    private Tareas : ITarea[];
    constructor(){
        this.Tareas = [];
    }
    add(nuevaTarea : ITarea) {
        const date = new Date();
        const nueva: ITarea = {
            ...nuevaTarea, 
            codigo: (Math.random()* 1000).toString()+new Date().getTime().toString(),
            fechavencimiento: date,
        }
        this.Tareas.push(nueva);
        return true;
    }
    getAll(){
        return this.Tareas;
    }
    update(updateTarea: ITarea){
        const newTareas: ITarea[] = this.Tareas.map((emp)=>{
            if (emp.codigo === updateTarea.codigo){
                return {...emp, ...updateTarea, update: new Date()};
            }
            return emp;
        });
        this.Tareas = newTareas;
        return true;

    }
    delete(codigo: string){
        const TareaToDelete = this.Tareas.find((emp)=>{
            return emp.codigo === codigo;
        });
        if(TareaToDelete){
            const newTareas: ITarea[] = this.Tareas.filter((emp)=>{
                return emp.codigo !== codigo;
            });
            this.Tareas =newTareas;
            return true;
        } 
        return false;
    }
}
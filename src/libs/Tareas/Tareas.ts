import { ITareas,DefaultTareas } from "@dao/models/tareas/ITareas";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Tareas {
//variable dao
  private daotareas: IDataAccessObject;
  //constructor
  constructor(daotareas: IDataAccessObject) {
    this.daotareas = daotareas;
  }


  //crear una nuevaT tarea
  
  add(nuevatarea: ITareas) {
    const date = new Date();
    const nuevaT: ITareas = {
      ...DefaultTareas,
      ...nuevatarea,
      createdAt: date,
      updatedAt: date,
      fechavencimiento: date
    }
    return this.daotareas.create(nuevaT);
  }

  //leer todas las tareas existentes
  getAll() {
    return this.daotareas.findAll();
  }

  //leer especifica por id
  getById(id: string) {
    return this.daotareas.findByID(id);
  }

  //actualizar una tarea existente
  update(id: string, updatetareas: ITareas) {
    const updateTareaObject = { ...updatetareas, updatedAt: new Date() };
    return this.daotareas.update(id, updateTareaObject);
  }


  //eliminar una tarea existente
  delete(id: string) {
    return this.daotareas.delete(id);
  }
}

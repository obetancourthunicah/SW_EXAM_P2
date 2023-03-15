import { IDataAccessObject } from "@server/dao/IDataAccessObject";
import { PlantaDao } from "@server/dao/models/plantas/PlantasDao";
import { IPlantas } from "@server/dao/models/plantas/IPlantas";

export class Plantas{
    private plantaDao: PlantaDao;
    constructor(planta: IDataAccessObject){
        this.plantaDao = planta as PlantaDao;
    }

    //Obtener todos los registros de plantas
    getAll(){
        return this.plantaDao.findAll();
    }

    //Obtener por ID
    getById(id:string){
        return this.plantaDao.findByID(id);
    }

    //Crear un registro de una planta Nueva
    add(newPlanta: IPlantas){
        const date = new Date();
        const plantita: IPlantas ={
            ...newPlanta,
            creado:date,
            ultimoAcceso: date
        }
        return this.plantaDao.create(plantita);
    }

    //Actualizar un registro de plantas
    update(id: string, updatePlanta: IPlantas){
        const updateObject = {...updatePlanta, ultimoAcceso: new Date()};
        return this.plantaDao.update(id, updateObject);
    }

    //Eliminar registro de Plantas
    delete(id: string){
        return this.plantaDao.delete(id);
    }
}
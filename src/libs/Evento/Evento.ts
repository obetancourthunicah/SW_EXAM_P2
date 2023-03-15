import { IEvento } from "@dao/models/Evento/IEvento";
import { IDataAccessObject } from "@dao/IDataAccessObject";
import { EventoDao } from "@dao/models/Evento/EventoDao";

export class Evento {
     private eventoDao: EventoDao;
     constructor(evento: IDataAccessObject) {
        this.eventoDao = evento as EventoDao;
      }

      getAll() {
        return this.eventoDao.findAll();
      }
      getById(_id: string) {
        return this.eventoDao.findByID(_id);
      }
      add(nuevoEvento: IEvento) {
        const nuevo: IEvento = {
          ...nuevoEvento,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        return this.eventoDao.create(nuevo);
      }
    
      update(_id: string, updateEvento: IEvento) {
        const updateObject = { ...updateEvento, updatedAt: new Date() };
        return this.eventoDao.update(_id, updateObject);
      }
    
      delete(id: string) {
        return this.eventoDao.delete(id);
      }
}
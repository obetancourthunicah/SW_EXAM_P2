import { IDataAccessObject } from "@dao/IDataAccessObject";
import { EventosDao } from "@dao/models/Eventos/EventosDao";
import { IEventos, DefaultEventos } from "@server/dao/models/Eventos/IEventos";
import { ObjectId } from "mongodb";

export class Eventos {
    private eventosDao: EventosDao;
    constructor(eventos: IDataAccessObject) {
        this.eventosDao = eventos as EventosDao;
    }

    public async newEvento(nuevoEvento: IEventos){
        try {
            const evento: IEventos = {
                ...DefaultEventos,
                ...nuevoEvento
            }
            const result = await this.eventosDao.create(evento);
            const rt = await this.eventosDao.findByFilter({_id: result.insertedId});
            console.log('Evento creado: ', result);
            return rt;
        } catch (ex) {
            console.error('Error al crear evento: ', ex);
            return null;
        }
    }

    public async getEventos(){
        try {
            const eventos = await this.eventosDao.findAll();
            return eventos;
        } catch (ex) {
            console.error('Error al obtener los eventos del calendario: ', ex);
            return null;
        }
    }

    public async getEventoById(id: string){
        const idevento = new ObjectId(id);
        try {
            const evento = await this.eventosDao.findByFilter({_id: idevento});
            return evento;
        } catch (ex) {
            console.error('Error al obtener el evento: ', ex);
            return null;
        }
    }

    public async updateEvento(id: string, updateCmd: Partial<IEventos>){
        try {
            await this.eventosDao.update(id, {...updateCmd, updatedAt: new Date()});
            const updateEvento = await this.eventosDao.findByID(id);
            console.log('Evento actualizado: ', updateEvento);
            return updateEvento;
        } catch (ex) {
            console.error('Error al actualizar el evento: ', ex);
            return null;
        }
    }

    public async deleteEvento(id: string){
        try {
            const evento = await this.eventosDao.delete(id);
            console.log('Evento eliminado: ', evento);
            return evento;
        } catch (ex) {
            console.error('Error al eliminar el evento: ', ex);
            return null;
        }
    }
}
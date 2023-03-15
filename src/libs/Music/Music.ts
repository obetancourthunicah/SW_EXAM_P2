import { IDataAccessObject } from "@dao/IDataAccessObject";
import { MusicDao } from "@dao/models/Music/MusicDao";

export class Music {
    private dao: MusicDao;
    constructor(dao: IDataAccessObject) {
        this.dao = dao as MusicDao;
    }

    getAllMusic() {
        return this.dao.findAll();
    }

    getMusicbyId(codigo: string) {
        return this.dao.findByID(codigo);
    }

    deleteMusic(codigo: string) {
        return this.dao.delete(codigo);
    }

}
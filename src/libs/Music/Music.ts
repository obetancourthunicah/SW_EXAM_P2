import { IDataAccessObject } from "@dao/IDataAccessObject";
import { MusicDao } from "@dao/models/Music/MusicDao";
import { IMusic } from "@server/dao/models/Music/IMusic";


export class Music {
    private dao: MusicDao;
    constructor(dao: IDataAccessObject) {
        this.dao = dao as MusicDao;
    }

    getAllMusic() {
        return this.dao.findAll();
    }

    public async newMusic(nombre: string, musicId: string) {
        try {
            const newMusic = { ...{ empresa: { id: musicId }, nombre } };
            const result = await this.dao.create(newMusic);
            console.log('resultad musica:', result);
            const rt = await this.dao.findByFilter({ _id: result?.insertedId });
            return rt;
        } catch (ex) {
            console.error('error en añadir musica:', ex);
            return null;
        }
    }
    public async updateMusic(id: string, updateMusic: IMusic) {
        const updateObject = { ...updateMusic, updated: new Date() };
        return await this.dao.update(id, updateObject);
    }

    getMusicbyId(codigo: string) {
        return this.dao.findByID(codigo);
    }

    deleteMusic(codigo: string) {
        return this.dao.delete(codigo);
    }

}
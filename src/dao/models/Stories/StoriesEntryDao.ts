import {MongoDAOBase} from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { IStorieEntry, DefaultStories } from './IStoryEntry';
import { IDataAccessObject } from '@dao/IDataAccessObject';
import { StoryDao } from './StoryDao';

export class StoriesEntryDao extends MongoDAOBase<IStorieEntry> {
    private Stories: IDataAccessObject;
    constructor(conexion: IDBConnection, Stories: IDataAccessObject) {
        super("stories", conexion);
        this.Stories = Stories;
    }
    public async create(stories: Partial<IStorieEntry>) {
        const { _id, nombre } = await this.Stories.findByID(id.toString());
        const newStories = {
            ...DefaultStories(),
            ...stories,
            ...{ Stories: { id: _id, nombre, descripcion, fecha_carga, url  } },
            ...{ fecha_carga: new Date()}
        };
        return super.create(newStories);
    }
    }
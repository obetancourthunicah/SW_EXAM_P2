import express from 'express';
const router = express.Router();
import { MusicDao } from '@server/dao/models/Music/MusicDao';
import { MongoDBConn } from '@server/dao/MongoDBConn';
import { IMusic } from '@server/dao/models/Music/IMusic';
import { Music} from '@libs/Music/Music'

const musicdao = new MusicDao(MongoDBConn);
let musicModel:Music;
musicdao.init().then(()=>{
  musicModel = new Music(musicdao);
});


router.get('/', (_req, res) => {
    const jsonUrls = {
        "getAll": { "method": "get", "url": "empresas/all" },
        "getById": { "method": "get", "url": "empresas/byid/:id" },
        "new": { "method": "post", "url": "empresas/new" },
        "update": { "method": "put", "url": "empresas/upd/:id" },
        "delete": { "method": "delete", "url": "empresas/del/:id" }
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', async(_req, res) => {
    res.status(200).json(await musicModel.getAllMusic());
});

router.get('/byid/:id' ,async(req, res)=>{
    const {id:codigo}= req.params;
    const empresa = await musicModel.getMusicbyId(codigo);
    if(empresa){
        return res.status(200).json(empresa);
    }
    return res.status(404).json({"error":"No se encontró empresa"});
});

router.post('/new', async(req, res) => {
    console.log("Music /new request body:", req.body);
    const {
        _id="NA",
        nombre = "album",
        artista="",
        album="",
        fechaLanzamiento=new Date(),
        url = "google"
    } = req.body;
    //Validar
    const newMusic: IMusic = {
        _id,
        nombre,
        artista,
        album,
        fechaLanzamiento,
        url
    };
    if (await musicModel.newMusic(newMusic)) {
        return res.status(200).json({ "created": true });
    }
    return res.status(404).json(
        { "error": "Error al agregar una empresa" }
    );
});



router.delete('/del/:id',async(req, res)=>{
    const {id} = req.params;
    if(await musicModel.deleteMusic(id)){
        return res.status(200).json({"deleted":true });
    }
    return res.status(404).json({"error": "no se pudo eliminar empresas"});
});

export default router;
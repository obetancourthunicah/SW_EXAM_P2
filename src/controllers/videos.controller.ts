import libs from '@libs/index';
import { DefaultVideo } from '@dao/models/Videos/IVideos';

const findAll = async (_req, res) => {
    res.status(200).json(await libs.VIDEOS.getAll());
}

const getByID = async (req, res)=>{
    const { id } = req.params;
    const datos = await libs.VIDEOS.getById(id);
    if(datos){
        return res.status(200).json(datos)
    }
    return res.status(200).json({ message: "¡Error al encontrar el Video!"})
}

const addVideo = async (req,res)=>{
    const { nombre, descripcion, url, fechaCarga } = req.body;
    const datos = DefaultVideo;
    datos.nombre = nombre;
    datos.descripcion = descripcion;
    datos.url = url;
    datos.fechaCarga = fechaCarga;

    if(await libs.VIDEOS.add(datos)){
       return res.status(201).json({message: "Video creado!"});
    }
    return res.status(404).json({message: "¡Error al crear un Video!"})
}

const updateVideo = async (req, res)=>{
    const { id } = req.params;
    const body = req.body;
    const datos = DefaultVideo;
    datos.nombre = body?.nombre;
    const video = await libs.VIDEOS.getById(id);
    if(video){
        if(await libs.VIDEOS.update(id,datos)){
            return res.json({message: "Video actualizada!"});
        }
        return res.status(404).json({message: "¡Error al actualizar el Video!"})
    }
    return res.status(404).json({message: "¡No existe el Video!"})
}

const deleteVideo = async (req,res)=>{
    const { id } = req.params;

    if(await libs.VIDEOS.delete(id)){
        return res.status(200).json(`Video con el ID: ${id} eliminado!`)
    }
    return res.status(200).json({ message: "¡Error al eliminar el Video!"})
}


export { findAll, getByID, addVideo, updateVideo, deleteVideo }

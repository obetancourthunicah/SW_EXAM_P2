import express from 'express';
import { MongoDBConn } from '@dao/MongoDBConn';

import { EventosDao } from '@dao/models/Eventos/EventosDao';
import { Eventos } from '@libs/Eventos/Eventos';

const eventosDao = new EventosDao(MongoDBConn);
let eventosModel: Eventos;

eventosDao.init().then(() => {
    eventosModel = new Eventos(eventosDao);
});

const router  = express.Router();

router.get('/', async (_req, res) => {
    const eventos = await eventosModel.getEventos();
    return res.status(200).json(eventos);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const evento = await eventosModel.getEventoById(id);
    return res.status(200).json(evento);
});

router.post('/new', async (req, res) => {
    const evento = await eventosModel.newEvento(req.body);
    return res.status(200).json(evento);
});

router.put('/upd/:id', async (req, res) => {
    const { id } = req.params;
    const evento = await eventosModel.updateEvento(id, req.body);
    return res.status(200).json(evento);
});

router.delete('/del/:id', async (req, res) => {
    const { id } = req.params;
    const evento = await eventosModel.deleteEvento(id);
    return res.status(200).json(evento);
});


export default router;
import { IAuditable } from '../IAuditable';

export interface IVideos extends IAuditable{
    _id?: string,
    nombre: string;
    descripcion: string
    fechaCarga: Date
    url: string
}

export const DefaultVideo: IVideos = {
  nombre: '',
  descripcion: '',
  fechaCarga: new Date(),
  url: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

import { IDataAccessObject } from "@dao/IDataAccessObject";
import { PlantasDao } from "@server/dao/models/Plantas/PlantasDao";
import { IPlantas, IFodaEstados } from "@server/dao/models/FODA/IFoda";
import { ObjectId } from "mongodb";

export class Plantas {
  private fodaDao: FodaDao;
  private plantasDao: IDataAccessObject;
  constructor(foda: IDataAccessObject, plantas: IDataAccessObject) {
    this.fodaDao = foda as FodaDao;
    this.plantasDao = plantas;
  }
  public async newFoda(nombre: string, plantasId: string) {
    try {
      const newFoda = { ...{ plantas: { id: plantasId }, nombre } };
      const result = await this.fodaDao.create(newFoda);
      console.log('newFoda result:', result); 
      const rt = await this.fodaDao.findByFilter({ _id: result?.insertedId });
      return rt;
    } catch (ex) {
      console.error('newFoda error:', ex);
      return null;
    }
  }
  public async updateFoda(fodaId: string, type: 'F' | 'D' | 'O' | 'A') {
    const result = await (this.fodaDao as FodaDao).updateCounter(fodaId, type);
    console.log('updateFoda:', result);
    const rt = await this.fodaDao.findByID(fodaId);
    return rt;
  }
  private async setUpdates(fodaId, updateCmd: Partial<IFoda>) {
    await this.fodaDao.update(fodaId, { ...updateCmd, updatedAt: new Date() });
    const updatedFoda = await this.fodaDao.findByID(fodaId);
    return updatedFoda;
  }
  public setObservation(fodaId: string, observation: string) {
    return this.setUpdates(fodaId, { observacion: observation });
  }
  public setNombre(fodaId: string, nombre: string) {
    return this.setUpdates(fodaId, { nombre: nombre });
  }
  public setEstado(fodaId: string, estado: IFodaEstados) {
    return this.setUpdates(fodaId, { estado });
  }
  public getAllFromPlantas(plantasId: string) {
    return this.fodaDao.findByFilter({ "plantas.id": new ObjectId(plantasId) });
  }
}
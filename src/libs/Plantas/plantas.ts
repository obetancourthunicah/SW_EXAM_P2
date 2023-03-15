import { IDataAccessObject } from "@dao/IDataAccessObject";
import { PlantasDao } from "@dao/models/Plantas/Plantas";

export class Plantas {
  private userDao: PlantasDao;
  constructor(user: IDataAccessObject) {
    this.userDao = user as PlantasDao;
  }
  public async newUser(email: string, password: string) {
    try {
      const newUser = {
        email,
       
      };
      const result = await this.Plantas.create();
      const rt = await this.userDao.findOneByFilter({ _id: result?.insertedId });
    
      return rt;
    } catch (ex) {
      console.error('newPlanta error:', ex);
      return null;
    }
  }
  public async loginUser(email:string, nombreCientifico:string) {
    try{
      const dbUser = await this.userDao.findOneByFilter(
        {email},
        {projection:{_id:1, email:1, password:1, state:1, roles:1, pswdExpires:1, avatar:1}}
      );
     
      console.error("User.loginUser can´t validate password");
      throw new Error("Can´t Validate Credentials");
    }catch(err){
      console.error(err);
      throw new Error("Can´t Validate Credentials");
    }
  }
}
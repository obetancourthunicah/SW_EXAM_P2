export interface IUserStory{
    codigo: string; 
    correo: string; 
    nombre: string; 
    password: string; 
    roles?: string []; 
    creado?: Date; 
    ultimoAcceso?: Date;
    observacion?: string;
  }
  
  export class usuarios{
  
   private usuarios: IUserStory[];
  
   constructor(){
       this.usuarios = [];
   }
  
   add(nuevoUsuario : IUserStory){
       const date = new Date();
       const nuevo: IUserStory ={
           ...nuevoUsuario,
           codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
           creado: date,
           ultimoAcceso: date
       }
       this.usuarios.push(nuevo);
       return true;
   }
  
   getAll(){
       return this.usuarios;
   }
  
   getById(codigo:string){
       const empresaToReturn = this.usuarios.find((user)=>{
           return user.codigo === codigo;
       });
       return empresaToReturn;
   }
   
   update(updateUsuario: IUserStory){
       const newUsuario: IUserStory[] = this.usuarios.map((user)=>{
           if (user.codigo === updateUsuario.codigo){
               return {... user, ...updateUsuario, ultimoAcceso: new Date()};
           }
           return user;
       });
       this.usuarios = newUsuario;
       return true;
   }
  
   delete(codigo:string){
       const UsuarioToDelete = this.usuarios.find((user)=>{
           return user.codigo === codigo;
       });
       if(UsuarioToDelete){
           const newUsuario: IUserStory[] = this.usuarios.filter((user)=>{
               return user.codigo !== codigo;
           });
           this.usuarios = newUsuario;
           return true;
       }
       return false;
   }
  }
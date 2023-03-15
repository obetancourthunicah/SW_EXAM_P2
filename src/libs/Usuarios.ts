export interface IUsuario{
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles: string;
    created?: Date;
    ultimoAcceso?: Date;
}

export class Usuarios {

    private usuarios: IUsuario[];
    constructor(){
        this.usuarios = [];
    }
    getAll(){
        return this.usuarios;
    }
    getById(codigo: string){
        const usuarioToReturn = this.usuarios.find((usa)=>{
          return usa.codigo === codigo;
        });
        return usuarioToReturn;
      }
    add(nuevoUsuario : IUsuario){
        const date =new Date();
        const nuevo: IUsuario = {
            ...nuevoUsuario,
            codigo: (Math.random()* 1000).toString()+new Date().getTime().toString(),
            created: date,
            ultimoAcceso: date
        }
        this.usuarios.push(nuevo);
        return true;
    }
    update(updateUsuarios : IUsuario){
        const newUsuarios: IUsuario[] = this.usuarios.map((usa)=>{
            if ( usa.codigo === updateUsuarios.codigo) {
                return {...usa, ...updateUsuarios, ultimoAcceso: new Date()};
            }
            return usa;
        });
        this.usuarios = newUsuarios;
        return true;
    }
    delete(codigo: string){
        const usuarioToDelete = this.usuarios.find((usa)=>{
          return usa.codigo === codigo;
        });
        if(usuarioToDelete){
          const newUsuarios: IUsuario[] = this.usuarios.filter((usa)=>{
            return usa.codigo !== codigo;
          });
          this.usuarios = newUsuarios;
          return true;
        }
        return false;
      }
}
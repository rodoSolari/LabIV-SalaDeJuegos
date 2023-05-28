export class Usuario {
  email:string;
    clave:string;
    nombre:string;

    constructor(email : string,clave : string,nombre : string){
        this.email = email;
        this.clave = clave;
        this.nombre = nombre;
    }

}

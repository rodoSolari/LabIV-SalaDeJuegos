import { Injectable } from '@angular/core';
import {Firestore, addDoc,collection,collectionData} from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listadoUsuario : any[]=[];

  constructor(private firestore : Firestore, private auth:AngularFireAuth) { }

  //se registra el mail de usuario y la fecha de logueo
  public subirLog( email: string, date:string){
    const col = collection(this.firestore,'logs');
    addDoc(col,{
      nombre: email,
      date: date
    });
  }

  public register(email : string, password: string, nombre : string){
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  public login(email : string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  //Para alojar los datos del usuario que se loguea en el local storage
  public setDataFromUser(user : Usuario) : void{
    const currentUser = localStorage.getItem('currentUser');
    let userStringify = JSON.stringify({"email" : user.email,"nombre" : user.nombre});
    if(currentUser == null){
      localStorage.setItem('currentUser', userStringify);
    }else{
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', userStringify);
    }
  }

  //cerrar sesion
  public logout(){
    this.auth.signOut();
  }

  //Para verificar si el usuario está logueado
  public userLogged(){
    return this.auth.authState;
  }

}

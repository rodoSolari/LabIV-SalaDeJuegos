import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore : Firestore) {

  }

  TraerMensajes(){
    const mensajes = collection(this.firestore,'chat');
    const observable = collectionData(mensajes);
    return observable;
  }

  EnviarMensaje(usuariologeado : any, nuevoMensaje : string){
    const mensaje = collection(this.firestore,'chat');
    addDoc(mensaje,{
      emisor : usuariologeado.uid,
      nombre: usuariologeado.displayName,
      texto: nuevoMensaje,
    });
  }

}

import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  items : any[] = [];

  constructor(private firestore : Firestore, private ang : AngularFirestore) {

  }

  TraerMensajes(){
    const mensajes = this.ang.collection('chat',ref => ref.orderBy('hora'))
    const observable = mensajes.snapshotChanges();
    return observable;
  }

   EnviarMensaje(usuariologeado : any, nuevoMensaje : string){
    const date = new Date();
    const mensaje = collection(this.firestore,'chat');
    addDoc(mensaje,{
      emisor : usuariologeado.uid,
      nombre: usuariologeado.displayName,
      texto: nuevoMensaje,
      hora: date.toLocaleString()
    });

  }

}

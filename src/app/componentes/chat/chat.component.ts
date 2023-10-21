import { Component, ElementRef, ViewChild } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  usuariologeado : any;
  mensaje : string = "";
  nuevoMensaje : string = "";
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  listaMensajes : any[]=[];

  constructor(private ChatService : ChatService,private UsuarioService : UsuarioService,private firestore : Firestore){

  }

  ngOnInit(): void {
    this.UsuarioService.userLogged().subscribe(usuario => {
      this.usuariologeado = usuario;
    });

    this.ChatService.TraerMensajes().subscribe((mensajes) => {
      this.listaMensajes = mensajes.map((doc) => {
        const data: any = doc.payload.doc.data();
        return {
          emisor: data.emisor,
          nombre: data.nombre,
          texto: data.texto,
          hora: data.hora
        };
      });
    })

    /*this.ChatService.TraerMensajes().subscribe((lista) => {
      this.listaMensajes = lista.sort((a,b) => {
        var asd = new Date(a['hora']).getTime() - new Date(b['hora']).getTime()
        return asd
      });
    });*/
  }

  estaLogueado() {
    if(this.usuariologeado){
        return true;
      }
      else{
        return false;
      }
  }

  EnviarMensaje(){
    this.ChatService.EnviarMensaje(this.usuariologeado, this.nuevoMensaje)
    this.nuevoMensaje= "";
  }

  scrollearHastaUltimoElemento() : void{
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch(err) { }
  }

  ngAfterViewChecked() {
      this.scrollearHastaUltimoElemento();
  }


}

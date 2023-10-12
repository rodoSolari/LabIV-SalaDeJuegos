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
  this.ChatService.TraerMensajes().subscribe((lista) => {
      this.listaMensajes = lista;
    });
  }

  ngOnInit(): void {
    this.scrollearHastaUltimoElemento();
    this.UsuarioService.userLogged().subscribe(usuario => {
      this.usuariologeado = usuario;
    });

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
    this.ChatService.EnviarMensaje(this.usuariologeado,this.nuevoMensaje);
    console.log("Mensaje enviado al chat, displayNmae:" + this.usuariologeado.displayName);
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

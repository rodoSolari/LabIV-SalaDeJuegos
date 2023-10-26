import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-huevo-del-dragon',
  templateUrl: './huevo-del-dragon.component.html',
  styleUrls: ['./huevo-del-dragon.component.scss']
})
export class HuevoDelDragonComponent implements OnInit{

    tablero : any[] = [];
    HuevoDragon : boolean = false;
    acertado : boolean = false;
    puntaje : number = 24;
    mensaje : string = "";
    perdioElJuego : boolean = false;
    gano : boolean = false;
    estiloBloqueo : string = "";

    usuario! : Usuario;
    //pointer-events:none;
    constructor(private service : UsuarioService){

    }

    ngOnInit(): void {
      this.comenzarJuego();
    }

    comenzarJuego(){
      this.mensaje = "";
      this.acertado = false;
      this.perdioElJuego=false;
      this.puntaje = 24;
      this.estiloBloqueo = "";
      this.armarTablero();
    }

    armarTablero(){
      this.tablero.length = 25;
      for(let i = 0;i<this.tablero.length;i++){
          this.tablero[i] = 'O';
        }
      this.tablero[Math.round(Math.random() * this.tablero.length)] = 'X'
    }

    acierta(posicion : any){
      if(posicion == 'X'){
        this.acertado = true;
        this.mensaje = "ACERTASTE, terminaste el juego con: " + this.puntaje + " Puntos";
        this.registrarPuntos();
        this.estiloBloqueo = "pointer-events:none";

      }else{
        this.acertado = false;
        this.puntaje--;
        if(this.puntaje == 0){
          this.perdioElJuego=true;
          this.mensaje = "Perdiste, desea volver a jugar?";
          this.registrarPuntos();
        }
      }
    }

    registrarPuntos(){
      const auth = getAuth();
      const user = auth.currentUser;
      if(user !== null && user?.email !==null  && user.displayName !==null){
        this.usuario = new Usuario(user.email," ",user.displayName);
        this.service.subirPuntaje(this.puntaje,this.usuario,"Huevo-del-dragon");
        console.log("SUBIDO PUNTAJE EXITOSAMENTE");
      }
    }
}

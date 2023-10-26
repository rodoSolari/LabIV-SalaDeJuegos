import { Component, OnInit } from '@angular/core';

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
//pointer-events:none;
    constructor(){

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
        this.estiloBloqueo = "pointer-events:none";

      }else{
        this.acertado = false;
        this.puntaje--;
        if(this.puntaje == 0){
          this.perdioElJuego=true;
          this.mensaje = "Perdiste, desea volver a jugar?";
        }
      }
    }
}

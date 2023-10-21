import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {

  constructor(){

  }

  ArrayPalabras : string[] = ['CARNE','MARTILLO', 'LAVADORA','SUCIO','CANGREJO','LENTO'];
  palabra : string = '';
  ArrayLetras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  vidas : number = 0;
  NroImagen : number = 0;
  Mensaje : string = "";
  perdioElJuego : boolean = false;

  //Palabra secreta
  palabraConGuiones : string[] = [];

  ngOnInit(): void {
    this.comenzarJuego();
  }

  comenzarJuego(){
    this.palabra = this.ArrayPalabras[Math.floor(Math.random()*this.ArrayPalabras.length)];
    this.palabraConGuiones = Array(this.palabra.length).fill('_');
    this.vidas = 6;
    this.NroImagen = 0;
    this.perdioElJuego = false;
  }

  verificarLetra(value : string){
    let aciertaLetra : boolean = false;
    for(let i = 0; i < this.palabra.length; i++){
      if(value == this.palabra[i]){
        this.palabraConGuiones[i] = value;
        aciertaLetra = true;
      }
    }
    this.verificarAcierto(aciertaLetra);
  }

  verificarAcierto(aciertaLetra : boolean){
    if(aciertaLetra == false){
      this.vidas--;
      this.NroImagen++;
      if(this.vidas == 0){
          this.perdioElJuego = true;
          this.Mensaje = "Perdiste, Desea volver a jugar?";
      }
    }
  }
}

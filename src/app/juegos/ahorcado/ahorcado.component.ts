import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {

  constructor(){

  }

  ArrayPalabras : string[] = ['AUTO','LIBRO'];
  palabra : string = '';
  ArrayLetras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  vidas : number = 0;
  NroImagen : number = 0;
  Mensaje : string = "";
  RepetirJuego : boolean = false;
  comenzar : boolean= false;
  puntaje : number = 0;
  perdioElJuego : boolean = false;

  //Palabra secreta
  palabraConGuiones : string[] = [];

  ngOnInit(): void {
    //this.comenzarJuego();
  }

  comenzarJuego(){
    this.palabra = this.ArrayPalabras[Math.floor(Math.random()*this.ArrayPalabras.length)];
    this.palabraConGuiones = Array(this.palabra.length).fill('_');
    this.vidas = 6;
    this.NroImagen = 0;
    this.RepetirJuego = false;
    this.comenzar = true;
    this.perdioElJuego  = false;
  }

  devolverArrayPalabras(){

  }

  resetearJuego(){
    this.ArrayPalabras = ['AUTO','LIBRO'];
    this.comenzar = false;
    this.perdioElJuego  = false;
    this.comenzarJuego();
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
    if(!this.palabraConGuiones.includes('_')){
      console.log("ACERTASTE!");
      this.puntaje++;
      this.NroImagen = 0;
      var cualEliminar = this.palabra;
      this.ArrayPalabras = this.ArrayPalabras.filter(function(i) { return i !== cualEliminar });
      console.log("array: "+this.ArrayPalabras);
      console.log(this.ArrayPalabras.length);
      if(this.ArrayPalabras.length == 0){
        this.RepetirJuego = true;
        this.Mensaje = "GANASTE EL JUEGO, FELICIDADES!!!";
      }else{
        this.comenzarJuego();
      }
    }
  }
}

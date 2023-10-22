import { Component } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.scss']
})
export class MayorOMenorComponent {
  ArrayCartas : any[] = [];
  cartaAnterior : any;
  cartaSiguiente : any;
  numeroAnterior : number = 0;
  numeroSiguiente : number = 0;
  puntaje : number = 0;
  Mensaje : string = "";
  perdioElJuego : boolean = false;
  comenzar : boolean= false;
  terminarJuego : boolean = false;
  imagenCarta : any;
  mensaje : string = "";

  constructor(private cartasService : CartasService){

  }

  ngOnInit(): void {
    this.cartasService.obtenerCartas().subscribe((cartas : any) =>{
      this.ArrayCartas = cartas.cards;
      this.ModificarValorCartas();
      // comenzarJuego();
    });
    console.log("VALOR DEL BOOLEAN" + this.perdioElJuego)
  }

  comenzarJuego(){
    this.perdioElJuego = false;
    this.cartaAnterior = this.devolverCartaRandom();
    this.numeroAnterior = this.cartaAnterior.value;

    this.cartaSiguiente = this.devolverCartaRandom();
    this.numeroSiguiente = this.cartaSiguiente.value;

    this.imagenCarta = this.cartaAnterior.image;
    this.comenzar = true;
    this.terminarJuego = false;
  }

  //Para modificar el valor numerico en las cartas A,J,Q y K
  ModificarValorCartas(){
    for(let i = 0; i < this.ArrayCartas.length;i++){
      switch(this.ArrayCartas[i].value){
        case 'ACE':
          this.ArrayCartas[i].value = 1
          break;
        case 'JACK':
          this.ArrayCartas[i].value = 11
        break;
        case 'QUEEN':
          this.ArrayCartas[i].value = 12
          break;
        case 'KING':
          this.ArrayCartas[i].value = 13
          break;
      }
    }
  }

  /*Igual(){

  }*/

  Mayor(){
    this.imagenCarta = this.cartaSiguiente.image
    if(this.numeroSiguiente >= this.numeroAnterior){
      this.numeroAnterior = this.numeroSiguiente; //Reemplazo el valor actual de la carta por la siguiente
      this.cartaSiguiente = this.devolverCartaRandom();
      this.numeroSiguiente = this.cartaSiguiente.value;
      this.puntaje++;
    }else{
      this.Mensaje = "Perdiste, Desea volver a jugar?:  ";
      this.perdioElJuego = true;
      this.puntaje=0;
    }
  }

  Menor(){
    this.imagenCarta = this.cartaSiguiente.image
    if(this.numeroSiguiente <= this.numeroAnterior){
      this.numeroAnterior = this.numeroSiguiente; //Reemplazo el valor actual de la carta por la siguiente
      this.cartaSiguiente = this.devolverCartaRandom();
      this.numeroSiguiente = this.cartaSiguiente.value;
      this.puntaje++;
    }else{
      this.Mensaje = "Perdiste, Desea volver a jugar?";
      this.perdioElJuego = true;
      this.puntaje=0;
    }
  }

  devolverCartaRandom(){
    return this.ArrayCartas[Math.round(Math.random() * this.ArrayCartas.length)];
  }

  retirarse(){
    this.terminarJuego = true;
    this.comenzar = false;
    this.mensaje= "Te has retirado, tu PUNTAJE es: " + this.puntaje;
  }

}

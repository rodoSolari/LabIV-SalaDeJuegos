import { Component } from '@angular/core';
import { switchAll } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {

  indice : number = 0;
  puntaje : number = 0;
  ArrayBanderas : any[] = [];
  vidas : number = 2;
  Mensaje : string = "";

  RepetirJuego : boolean = false;
  comenzar : boolean= false;
  perdioElJuego : boolean = false;
  respuestaCorrecta : boolean = false;
  pregunta : any = [];

  baseDePreguntas : any = [
    {
      pregunta: "Como se llama el pais de esta bandera?",
      imagen: "",
      respuesta1:"irlanda" ,
      respuesta2:"noruega" ,
      respuesta3:"escocia" ,
      respuesta4:"venezuela" ,
      respuestaCorrecta:2
    },
    {
      pregunta:"Cuantos atomos de hidrogeno contiene el agua?" ,
      imagen : "../../../assets/agua.png",
      respuesta1:"2" ,
      respuesta2:"4" ,
      respuesta3:"1" ,
      respuesta4:"No tiene" ,
      respuestaCorrecta: 2
    },
    {
      pregunta:"En que continente se encuentra Alemania?" ,
      imagen : "",
      respuesta1:"Europa" ,
      respuesta2:"Norte America" ,
      respuesta3:"Oceania" ,
      respuesta4:"Asia" ,
      respuestaCorrecta: 1
    },
    {
      pregunta:"En que continente se encuentra el pais de noruega?" ,
      imagen : "",
      respuesta1:"Europa" ,
      respuesta2:"Norte America" ,
      respuesta3:"Oceania" ,
      respuesta4:"Asia" ,
      respuestaCorrecta: 1
    },
  ];

  constructor(private api : ApiService){

  }

  ngOnInit(): void {
    this.api.obtenerBanderas().subscribe((banderas : any) =>{
      this.ArrayBanderas = banderas;
      this.cargarBanderas();
      this.comenzarJuego();
    });
  }

  cargarBanderas(){
      this.baseDePreguntas[0].imagen = this.ArrayBanderas[51].flags.png;
      this.baseDePreguntas[2].imagen = this.ArrayBanderas[48].flags.png;
  }

  comenzarJuego(){
    this.pregunta = this.baseDePreguntas[2/*Math.floor(Math.random()*this.baseDePreguntas.length)*/];
    this.vidas = 2;
    this.RepetirJuego = false;
    this.comenzar = true;
    this.perdioElJuego  = false;
    this.respuestaCorrecta = false;
  }

  resetearJuego(){
    this.comenzar = false;
    this.perdioElJuego  = false;
    this.comenzarJuego();

  }

  seleccionarOpcion(opcion : number) {
    if(this.pregunta.respuestaCorrecta != opcion){
      this.vidas--;
      if(this.vidas == 0){
        this.perdioElJuego  = true;
        this.respuestaCorrecta = false;
        this.Mensaje = "Respuesta incorrecta, desea volver a jugar?";
      }else{
        this.respuestaCorrecta = false;
        this.Mensaje = "Respuesta incorrecta";
        //siguientePregunta()
      }
    }else{
      this.respuestaCorrecta = true;
      this.Mensaje = "Respuesta correcta!"
      //siguientePregunta()
      /*var cualEliminar = this.palabra;
      this.ArrayPalabras = this.ArrayPalabras.filter(function(i) { return i !== cualEliminar });*/
    }
  }

  siguientePregunta(){

  }

}

import { Component } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { switchAll } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { ApiService } from 'src/app/services/api.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  indicePregunta : number = 0;
  Mensaje : string = "";
  estiloBloqueo : string = "";

  RepetirJuego : boolean = false;
  comenzar : boolean= false;
  perdioElJuego : boolean = false;
  respuestaCorrecta : boolean = false;
  pregunta : any = [];

  usuario! : Usuario;

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
      respuesta1:"4" ,
      respuesta2:"2" ,
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

  constructor(private api : ApiService, private usuarioServ : UsuarioService){

  }

  ngOnInit(): void {
    this.api.obtenerBanderas().subscribe((banderas : any) =>{
      this.ArrayBanderas = banderas;
      this.cargarBanderas();

    });
    this.comenzarJuego();

  }

  cargarBanderas(){
      this.baseDePreguntas[0].imagen = this.ArrayBanderas[51].flags.png;
      this.baseDePreguntas[2].imagen = this.ArrayBanderas[48].flags.png;
  }

  comenzarJuego(){
    this.pregunta = this.baseDePreguntas[this.indicePregunta];
    this.vidas = 2;
    this.RepetirJuego = false;
    this.comenzar = true;
    this.perdioElJuego  = false;
    this.respuestaCorrecta = false;
    this.estiloBloqueo = "";
    this.Mensaje = "";
  }

  resetearJuego(){
    this.comenzar = false;
    this.perdioElJuego  = false;
    this.indicePregunta = 0;
    this.comenzarJuego();
  }

  seleccionarOpcion(opcion : number) {
    if(this.pregunta.respuestaCorrecta != opcion){
      this.vidas--;
      if(this.vidas == 0){
        this.perdioElJuego  = true;
        this.respuestaCorrecta = false;
        this.Mensaje = "Respuesta incorrecta, desea volver a jugar?";
        this.registrarPuntos();
        this.estiloBloqueo = "pointer-events:none";
      }else{
        this.respuestaCorrecta = false;
        this.Mensaje = "Respuesta incorrecta";
        this.indicePregunta++;
      }
    }else{
      this.puntaje+=5;
      this.respuestaCorrecta = true;
      this.Mensaje = "Respuesta correcta!"
      if(this.indicePregunta < this.baseDePreguntas.length){
        this.indicePregunta++;
      }
    }
    setTimeout(() => {
      if(!this.perdioElJuego){
        if(this.baseDePreguntas.length == this.indicePregunta){
          this.Mensaje = "FINALIZASTE, tu puntaje final es: " + this.puntaje;
          this.registrarPuntos();
          this.estiloBloqueo = "pointer-events:none";
        }else{
          this.Mensaje = "";
          this.pregunta = this.baseDePreguntas[this.indicePregunta];
        }
      }
    }, 1000);

  }

  registrarPuntos(){
    const auth = getAuth();
    const user = auth.currentUser;
    if(user !== null && user?.email !==null  && user.displayName !==null){
      this.usuario = new Usuario(user.email," ",user.displayName);
      this.usuarioServ.subirPuntaje(this.puntaje,this.usuario,"Preguntados");
      console.log("SUBIDO PUNTAJE EXITOSAMENTE");
    }
  }


}

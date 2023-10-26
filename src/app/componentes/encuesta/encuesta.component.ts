import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  usuario! : Usuario;
  formGroup! : FormGroup;
  Mensaje : string = "";

  constructor(private router : Router,private form : FormBuilder,
              private UsuarioServ : UsuarioService,){

  }

  ngOnInit(): void {
    this.formGroup = this.form.group({
      'nombre':['',[Validators.required]],
      'apellido':['',[Validators.required]],
      'edad': ['', [Validators.required, Validators.min(18),Validators.max(99)]],
      'Telefono':['',[Validators.required,Validators.min(11111111),Validators.max(99999999)]],
      'huevoDelDragon':['',],
      'MayorMenor':['',],
      'preguntados':['',],
      'ahorcado':['',],
      'ninguno':['',],
      'opinion':['',[Validators.required]],
      'opinionPagina':['',[Validators.required]],
      'radioDificil':['',],
      'radioFacil':['',],
    });

  }

  enviar(){
      console.log(this.formGroup.getRawValue());
      this.UsuarioServ.subirEncuesta(this.formGroup.getRawValue());
      this.Mensaje = "Encuesta enviada correctamente";
  }


}

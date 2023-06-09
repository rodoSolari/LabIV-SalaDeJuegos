import { Component } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  date = new Date();
  email : string = '';
  clave : string = '';

  constructor(public service : UsuarioService, private router : Router) {}

  ngOnInit(): void {

  }

  login(){
    this.service.login(this.email,this.clave).then((userCredential) => {
      const date : Date = new Date();
      this.service.subirLog(this.email,date.toLocaleString());
      console.log("usuario logueado correctamente");
      let nombreUsuarioLogueado = userCredential.user!.displayName;

      let usuario = new Usuario(this.email,this.clave,nombreUsuarioLogueado!);
      this.service.setDataFromUser(usuario);
      this.router.navigate(['home']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  fillUserData(){
    this.email = "usuarioprueba@hotmail.com"
    this.clave = "prueba123";
  }

}

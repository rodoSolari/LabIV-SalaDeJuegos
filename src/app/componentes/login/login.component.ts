import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  date = new Date();
  email : string = '';
  clave : string = '';
  mensaje : string = ''

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
      console.log(userCredential);
      this.router.navigate(['home']);
    })
    .catch((error) => {
      this.mensaje = error.message.slice(9);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  fillUserData(){
    this.email = "usuarioprueba@hotmail.com"
    this.clave = "prueba123";
  }

}

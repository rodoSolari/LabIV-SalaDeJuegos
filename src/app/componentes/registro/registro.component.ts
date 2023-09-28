import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  date = new Date();
  arrayUsuarios : Usuario[];
  mensaje : string;
  email : string = '';
  clave : string = '';
  nombre : string = '';

  constructor(public service:UsuarioService,private firestore : Firestore, private router : Router) {
    this.arrayUsuarios = new Array();
    //this.arrayUsuarios = this.service.getUsers();
    this.mensaje = '';
  }

  ngOnInit(): void {
  }

  register(){
    var date = new Date();
    this.service.register(this.email,this.clave,this.nombre).then((userCredential) => {
      console.log("registrado exitosamente");

      const col = collection(this.firestore,'Usuarios');
      addDoc(col,{
        email:this.email,
        nombre:this.nombre,
      });
      userCredential.user?.updateProfile({displayName: this.nombre})
      console.log("usuario registrado y logueado correctamente");

      const currentUser = JSON.stringify({"email" : this.email,"nombre" : this.nombre})

      localStorage.setItem("currentUser",currentUser);
      this.router.navigate(['home']);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(error.code == "auth/email-already-in-use"){
        this.showMessage();
      }
    });
  }


  showMessage(){
      this.mensaje = "El usuario que desea registrar ya existe, por favor vuelva a ingresar otros datos";
  }

}

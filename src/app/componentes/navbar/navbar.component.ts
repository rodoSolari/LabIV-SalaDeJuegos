import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public service : UsuarioService) {}

  ngOnInit(): void {}

  public userIsLogged(){
    return localStorage.getItem('currentUser')!=null;
  }

  getUserName(){
    const dataCurrentUser = localStorage.getItem('currentUser');
    if(dataCurrentUser != null){
      let usr = JSON.parse(dataCurrentUser);
      return usr.nombre;
    }
    return "error" ;
  }

  logout(){
    console.log("cerrando sesion..");
    this.service.logout();
    localStorage.clear();
    localStorage.removeItem('currentUser');
  }
}


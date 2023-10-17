import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public service : UsuarioService) {}

  usuariologeado : any;

  ngOnInit(): void {
  }

  public userIsLogged(){
    return this.service.userLogged();
  }

  logout(){
    console.log("cerrando sesion..");
    this.service.logout();
    /*localStorage.clear();
    localStorage.removeItem('currentUser');*/
  }
}

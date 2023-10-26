import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public service : UsuarioService, private router : Router) {}

  usuariologeado : any;

  ngOnInit(): void {
    this.service.userLogged().subscribe(usuario => {
      this.usuariologeado = usuario;
      //console.log(this.usuariologeado);
    });
  }

  public userIsLogged(){
    // return this.service.userLogged();
  }

  logout(){
    console.log("cerrando sesion..");
    this.service.logout();
    this.router.navigate(['home']);
    /*localStorage.clear();
    localStorage.removeItem('currentUser');*/
  }
}

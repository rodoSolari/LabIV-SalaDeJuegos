import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from 'src/app/componentes/juegos/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from 'src/app/componentes/juegos/mayor-o-menor/mayor-o-menor.component';

const routes: Routes = [
  {path:'',component:JuegosComponent},
  {path:'ahorcado',component:AhorcadoComponent},
  {path:'mayor-o-menor',component:MayorOMenorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }

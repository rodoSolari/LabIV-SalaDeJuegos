import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { HuevoDelDragonComponent } from './huevo-del-dragon/huevo-del-dragon.component';

const routes: Routes = [
  {path:'ahorcado',component:AhorcadoComponent},
  {path:'mayor-o-menor',component:MayorOMenorComponent},
  {path:'preguntados',component:PreguntadosComponent},
  {path:'huevo-del-dragon',component:HuevoDelDragonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }

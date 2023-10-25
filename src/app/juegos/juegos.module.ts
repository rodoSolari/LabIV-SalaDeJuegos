import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { FormsModule } from '@angular/forms';
import { HuevoDelDragonComponent } from './huevo-del-dragon/huevo-del-dragon.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOMenorComponent,
    HuevoDelDragonComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule,
  ]
})
export class JuegosModule { }

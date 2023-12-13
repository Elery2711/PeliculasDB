import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificarPeliculaPageRoutingModule } from './calificar-pelicula-routing.module';

import { CalificarPeliculaPage } from './calificar-pelicula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificarPeliculaPageRoutingModule
  ],
  declarations: [CalificarPeliculaPage]
})
export class CalificarPeliculaPageModule {}

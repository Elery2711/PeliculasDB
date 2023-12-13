import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalificarPeliculaPage } from './calificar-pelicula.page';

const routes: Routes = [
  {
    path: '',
    component: CalificarPeliculaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalificarPeliculaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMoviePageRoutingModule } from './update-movie-routing.module';

import { UpdateMoviePage } from './update-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMoviePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UpdateMoviePage]
})
export class UpdateMoviePageModule {

}

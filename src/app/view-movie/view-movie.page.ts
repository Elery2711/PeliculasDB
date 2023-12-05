import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.page.html',
  styleUrls: ['./view-movie.page.scss'],
})
export class ViewMoviePage{
  public viewForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService) { 
    const movie = this.moviesService.moviewhere || {}; 
    this.viewForm = this.formBuilder.group({
      titulo: [movie.titulo, Validators.required],
      genero: [movie.genero, Validators.required],
      duracion: [movie.duracion, Validators.required],
      director: [movie.director, Validators.required],
      sinopsis: [movie.sinopsis, Validators.required],
      portada: [movie.portada, Validators.required],
      precio: [movie.precio, Validators.required]
    })
  }

}

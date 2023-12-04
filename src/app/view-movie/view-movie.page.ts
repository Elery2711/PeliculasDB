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
    this.viewForm = this.formBuilder.group({
      titulo: [this.moviesService.moviewhere.titulo, Validators.required]
    })
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../models/pelicula.model';
import { CartService } from '../services/cart-service.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.page.html',
  styleUrls: ['./view-movie.page.scss'],
})
export class ViewMoviePage{
  public viewForm: FormGroup;
  public moviesFounds: Pelicula[] = [];
  public movies: Pelicula[] = [];

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService, private cartService : CartService, private toastController: ToastController, private router: Router) { 
    const movie = this.moviesService.moviewhere || {}; 
    this.viewForm = this.formBuilder.group({
      titulo: [movie.titulo, Validators.required],
      genero: [movie.genero, Validators.required],
      duracion: [movie.duracion, Validators.required],
      director: [movie.director, Validators.required],
      sinopsis: [movie.sinopsis, Validators.required],
      portada: [movie.portada, Validators.required],
      precio: [movie.precio, Validators.required],
      id: [movie.id]
    })

    this.moviesService.getAllMovies().subscribe((movies: Pelicula[]) => {
      this.movies = movies;
      this.moviesFounds = this.movies;
    });
  }

  public async addToCart(movie: Pelicula) {
    this.cartService.addToCart(movie);
    console.log(this.cartService.getCart());
    const toast = await this.toastController.create({
      message: `¡Pelicula "${movie.titulo}" añadida al carrito!`,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  openCalificarPelicula(id:string) {
    this.moviesService.pos = this.movies.findIndex(item => item.id == id);
    this.moviesService.moviewhere = this.movies[this.moviesService.pos];
    this.moviesService.movieCollection.snapshotChanges().subscribe((data) => {
      this.moviesService.moviewhere.id = data[this.moviesService.pos].payload.doc.id;
    });  
    this.router.navigate(['/calificar-pelicula']); // Asume que la ruta 'product-add' existe para añadir productos.
  }

}

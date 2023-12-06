import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../models/pelicula.model';
import { CartService } from '../services/cart-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.page.html',
  styleUrls: ['./view-movie.page.scss'],
})
export class ViewMoviePage{
  public viewForm: FormGroup;
  public moviesFounds: Pelicula[] = [];

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService, private cartService : CartService, private toastController: ToastController) { 
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

  public async addToCart(movie: Pelicula) {
    this.cartService.addToCart(movie);
    console.log(this.cartService.getCart());
    const toast = await this.toastController.create({
      message: '¡Producto añadido al carrito!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}

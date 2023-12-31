import { Component } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { CartService } from '../services/cart-service.service';
import { UserService } from '../services/user.service';
import { LibraryService } from '../services/library.service';
import { Library } from '../models/pelicula.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public movies: Pelicula[] = [];
  public moviesFounds: Pelicula[] = [];
  public filter = [
    'Drama',
    'Comedia',
    'Acción',
    'Terror',
    'Ciencia Ficción',
    'Musical',
    'Infantil',
    'Animación',
    'Suspenso',
    'Documental',
    'Romance',
    'Fantasía',
    'Aventura',
    'Bélico',
    'Crimen',
    'Misterio',
    'Biográfico',
    'Histórico',
    'Deportivo',
    'Western',
    'Guerra'
  ];

  constructor(private cartService: CartService, private userService: UserService, private router: Router, private moviesService: MoviesService , private LibraryService: LibraryService, private toastController: ToastController) {
    this.moviesService.getAllMovies().subscribe((movies: Pelicula[]) => {
      this.movies = movies;
      this.moviesFounds = this.movies;
    });

  }

  openViewMovie(titulo:string) {
    this.moviesService.pos = this.movies.findIndex(item => item.titulo == titulo);
    this.moviesService.moviewhere = this.movies[this.moviesService.pos];
    this.moviesService.movieCollection.snapshotChanges().subscribe((data) => {
      this.moviesService.moviewhere.id = data[this.moviesService.pos].payload.doc.id;
    });
    console.log(this.moviesService.moviewhere);
    
    
    this.router.navigate(['/view-movie']);
    
  }

  public filterMovies(): void {
    console.log(this.filter);
    this.moviesFounds = this.movies.filter(
      item => {
        return this.filter.includes(item.genero);
      }
    );
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

  openMovieAddPage() {
    this.router.navigate(['/add-movie']); // Asume que la ruta 'product-add' existe para añadir productos.
  }

  logOut(){
    this.router.navigate(['/login']);
  }


  getUsuario(){
    return this.userService.getCurrentUser();
  }

  openMovieUpdatePage(name:string) {
    this.moviesService.pos = this.movies.findIndex(item => item.titulo == name);
    this.moviesService.moviewhere = this.movies[this.moviesService.pos];
    this.moviesService.movieCollection.snapshotChanges().subscribe((data) => {
      this.moviesService.moviewhere.id = data[this.moviesService.pos].payload.doc.id;
    });
    console.log(this.moviesService.moviewhere);
    
    
    this.router.navigate(['/update-movie']);
    
  }
  
}

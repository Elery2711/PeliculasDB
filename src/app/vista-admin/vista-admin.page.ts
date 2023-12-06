import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart-service.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { LibraryService } from '../services/library.service';
import { Pelicula } from '../models/pelicula.model';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.page.html',
  styleUrls: ['./vista-admin.page.scss'],
})
export class VistaAdminPage  {

  public movies: Pelicula[] = [];
  public products: Pelicula[] = [];
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

  constructor( private cartService: CartService, private userService: UserService, private router: Router, private moviesService: MoviesService , private LibraryService: LibraryService) {
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

  openMovieUpdatePage(name:string) {
    this.moviesService.pos = this.movies.findIndex(item => item.titulo == name);
    this.moviesService.moviewhere = this.movies[this.moviesService.pos];
    this.moviesService.movieCollection.snapshotChanges().subscribe((data) => {
      this.moviesService.moviewhere.id = data[this.moviesService.pos].payload.doc.id;
    });
    console.log(this.moviesService.moviewhere);
    
    
    this.router.navigate(['/update-movie']);
    
  }


  public filterMovies(): void {
    console.log(this.filter);
    this.moviesFounds = this.movies.filter(
      item => {
        return this.filter.includes(item.genero);
      }
    );
  }

  public addToCart(movie: Pelicula) {
    this.cartService.addToCart(movie);
    console.log(this.cartService.getCart());
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

  deleteProduct(movie: Pelicula) {
    console.log(this.moviesService.DeleteAndgetId(movie));
  }



}

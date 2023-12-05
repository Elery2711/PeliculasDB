import { Component } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { CartService } from '../services/cart-service.service';
import { UserService } from '../services/user.service';
import { LibraryService } from '../services/library.service';
import { Library } from '../models/pelicula.model';

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

  constructor(private cartService: CartService, private userService: UserService, private router: Router, private moviesService: MoviesService , private LibraryService: LibraryService) {
    this.moviesService.getAllMovies().subscribe((movies: Pelicula[]) => {
      this.movies = movies;
      this.moviesFounds = this.movies;
    });

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

  public addMovieToLibrary(movie: Pelicula): void {
    var doc = this.getUsuario()!.uid;
    var library: Library = {
      items: [],
      user: doc
    };
    this.LibraryService.getLibraryByUser(doc).then((doc) => {
      if(doc == undefined){
        this.LibraryService.addLibrary(library);
        console.log('Libreria creada');
      }
      else{
        console.log('Libreria ya existe');
      }
    }
    )
    this.LibraryService.addMovieToLibrary(movie, doc);

    
  }

  
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public movieCollection: AngularFirestoreCollection<Pelicula>;
  private movie: Observable<Pelicula[]>;
  public pos = 0;
  public moviewhere: Pelicula = {
    id: '',
    titulo: '',
    genero: '',
    duracion: '',
    director: '',
    sinopsis: '',
    portada: '',
    precio: 0
  };

  constructor(private FireStore: AngularFirestore) { 
    this.movieCollection = this.FireStore.collection<Pelicula>('movies');
    this.movie = this.movieCollection.valueChanges();
   }


  // Método para obtener todas las películas
  getAllMovies(): Observable<Pelicula[]> {
    return this.movie;
  }
  
  // Método para eliminar una película
  deleteMovie(movie: Pelicula): Promise <string> {
    return this.movieCollection.doc(movie.id).delete()
    .then((doc)=>{
      console.log('Pelicula eliminada con id'+ movie.id);
      return 'success'
    })
    .catch((error)=>{
      console.log('Error al eliminar pelicula'+ error);
      return 'Error'
    });
  }

  // Método para agregar una película
  addMovie(movie: Pelicula): Promise <string> {
    return this.movieCollection.add(movie)
    .then((doc)=>{
      console.log('Pelicula agregada con id'+ movie.id);
      return 'success'
    })
    .catch((error)=>{
      console.log('Error al agregar pelicula'+ error);
      return 'Error'
    });
  }

  // Método para actualizar una película
  updateMovie(movie: Pelicula): Promise <string> {
    return this.movieCollection.doc(movie.id).update(movie)
    .then((doc)=>{
      console.log('Pelicula actualizada con id'+ movie.id);
      return 'success'
    })
    .catch((error)=>{
      console.log('Error al actualizar pelicula'+ error);
      return 'Error'
    });
  }
}

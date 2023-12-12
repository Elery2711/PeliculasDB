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
    precio: 0,
    comentarios: []
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
  

  DeleteAndgetId(movie: Pelicula) {
    this.FireStore.collection('movies', ref =>
      ref.where('director', '==', movie.director)
         .where('duracion', '==', movie.duracion)
         .where('genero', '==', movie.genero)
         .where('portada', '==', movie.portada)
         .where('sinopsis', '==', movie.sinopsis)
         .where('titulo', '==', movie.titulo)
         .where('precio', '==', movie.precio)
         .where('comentarios', '==', movie.comentarios)
    )
    .get()
    .subscribe(querySnapshot => {
      if (querySnapshot.size > 0) {
        const isConfirmed = confirm('¿Estás seguro de que deseas eliminar esta pelicula?');
        
        if (isConfirmed) {
          querySnapshot.forEach(doc => {
            const docId = doc.id;
  
            this.FireStore.collection('movies').doc(docId).delete()
              .then(() => {
                console.log('Pelicula eliminada exitosamente.');
              })
              .catch(error => {
                console.error('Error al eliminar el Pelicula:', error);
              });
          });
        } else {
          console.log('La eliminación de la Pelicula fue cancelada.');
        }
      } else {
        console.log('Pelicula no encontrada.');
      }
    });
  }

  async getMovieById(movieId: string): Promise<Pelicula | undefined> {
    const snapshot = await this.movieCollection.doc(movieId).ref.get();
    return snapshot.exists ? snapshot.data() as Pelicula : undefined;
  }

  updateMovie(movie:Pelicula):Promise<string>{
    return this.movieCollection.doc(movie.id).update(movie)
    .then((doc)=>{
      console.log('Pelicula actualizada con id'+ movie.id);
  
      return 'success'
    })
    .catch((error)=>{
      console.log('Error al actualizar Pelicula'+ error);
      return 'Error'
    });
  }
}

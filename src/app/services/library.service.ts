import { Injectable } from '@angular/core';
import { Pelicula, Library } from '../models/pelicula.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, async } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private library: Observable<Library[]>;

  private userID = localStorage.getItem('userID');

  constructor(private firestore:AngularFirestore) { 
    this.library = this.firestore.collection<Library>('library', ref => ref.where('user', '==', this.userID)).valueChanges();
  }

  public getLibrary(): Observable<Library[]> {
    return this.library;
  }

  public createLibrary(): Promise<string> {
    const library: Library = {
      items: [],
      user: localStorage.getItem('userID')!
    };
    return this.firestore.collection('library').add(library)
      .then((doc)=>{
        console.log('Libreria creada' + doc.id);
        return 'success'
      })
      .catch((error)=>{
        console.log('error de:'+ error);
        return 'Error'
      });
  }

  public updateLibrary(movie: Pelicula): Promise<string> {
    this.createLibrary();

    return this.firestore.collection('library').doc(localStorage.getItem('userID')!).update({
      items: movie
    })
      .then((doc)=>{
        console.log('Libreria actualizada');
        return 'success'
      })
      .catch((error)=>{
        console.log('error de:'+ error);
        return 'Error'
      });
  }
}

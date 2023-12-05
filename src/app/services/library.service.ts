import { Injectable } from '@angular/core';
import { Pelicula, Library } from '../models/pelicula.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, async } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private library: Observable<Library[]>;

  constructor(private firestore:AngularFirestore, private userService: UserService) { 
    this.library = this.firestore.collection<Library>('library').valueChanges();
  }

  public getLibrary(): Observable<Library[]> {
    return this.library;
  }

  public createLibrary(): Promise<string> {
    const library: Library = {
      items: [],
      user: this.getUsuario()!.uid
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

  public addMovieToLibrary(movie: Pelicula, doc: any): Promise<string> {
    return this.firestore.collection('library').doc(doc).update({
      items: movie
    })
      .then(()=>{
        console.log('Pelicula agregada a la libreria');
        return 'success'
      })
      .catch((error)=>{
        console.log('error de:'+ error);
        return 'Error'
      });    
  }

  getUsuario(){
    return this.userService.getCurrentUser();
  }

  public async getLibraryByUser(userId: string): Promise<Library | undefined> {
    const libraryArray = await this.library.toPromise(); // Convert Observable to Promise
    const l = libraryArray!.find((library: Library) => library.user === userId);
    return l;
  }

  public async addLibrary(library: Library): Promise<string> {
    return this.firestore.collection('library').add(library)
      .then(()=>{
        console.log('Libreria creada');
        return 'success'
      })
      .catch((error)=>{
        console.log('error de:'+ error);
        return 'Error'
      });
  }

  public async updateLibrary(library: Library): Promise<string> {
    return this.firestore.collection('library').doc(library.user).update(library)
      .then(()=>{
        console.log('Libreria actualizada');
        return 'success'
      })
      .catch((error)=>{
        console.log('error de:'+ error);
        return 'Error'
      });
  }


}

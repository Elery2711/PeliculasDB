import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pelicula } from '../models/pelicula.model';

@Component({
  selector: 'app-calificar-pelicula',
  templateUrl: './calificar-pelicula.page.html',
  styleUrls: ['./calificar-pelicula.page.scss'],
})
export class CalificarPeliculaPage{
  public comment: string="";
  public stars: number=1;
  movie: any;
  constructor(private router: Router, private toastController: ToastController, private moviesService: MoviesService, private firestore: AngularFirestore) { 
    this.movie = this.moviesService.moviewhere || {}; 
  }

  async submitForm(movie: Pelicula) {
    const comentario: string[] = [this.comment];
    console.log(this.moviesService.comentariosMovie(movie, comentario));

    console.log('Comentario:', this.comment);
    console.log('Estrellas:', this.stars);
    const toast = await this.toastController.create({
      message: "Calificación enviada correctamente",
      duration: 2000,
      position: 'top'
    });
    toast.present();
    this.router.navigate(['/view-movie']);
  }

}
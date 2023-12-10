import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pelicula } from '../models/pelicula.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-calificar-pelicula',
  templateUrl: './calificar-pelicula.page.html',
  styleUrls: ['./calificar-pelicula.page.scss'],
})
export class CalificarPeliculaPage{
  public comment: string="";
  public stars: number=1;
  movie: any;
  constructor(private userService: UserService, private router: Router, private toastController: ToastController, private moviesService: MoviesService, private firestore: AngularFirestore) { 
    this.movie = this.moviesService.moviewhere || {}; 
  }

  getUsuario(){
    return this.userService.getCurrentUser();
  }

  getCorreo(){
    return this.userService.getCurrentUserEmail();
  }

  async submitForm(movie: Pelicula) {
    const usuario = this.getUsuario()?.displayName;
    const correo = this.getCorreo();

    if (usuario !== null && usuario !== undefined && correo !== null) {
      const email: string = correo;
      const user: string = usuario;
      console.log(this.moviesService.comentariosMovie(movie, user, email, this.comment, this.stars));

      const toast = await this.toastController.create({
        message: "Calificación enviada correctamente",
        duration: 2000,
        position: 'top'
      });
      toast.present();
      this.router.navigate(['/view-movie']);
    }
  }

}
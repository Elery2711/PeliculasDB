import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calificar-pelicula',
  templateUrl: './calificar-pelicula.page.html',
  styleUrls: ['./calificar-pelicula.page.scss'],
})
export class CalificarPeliculaPage{
  public comment: string="";
  public stars: number=1;
  constructor(private router: Router, private toastController: ToastController) { }

  async submitForm() {
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

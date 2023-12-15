import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.page.html',
  styleUrls: ['./update-movie.page.scss'],
})
export class UpdateMoviePage  {


  public movieForm: FormGroup;

  constructor(private router:Router, private toastController: ToastController, private alertController: AlertController,private formBuilder: FormBuilder, private movieService: MoviesService) {
    this.movieForm= this.formBuilder.group({
      titulo: [this.movieService.moviewhere.titulo, Validators.required],
      genero: [this.movieService.moviewhere.genero, Validators.required],
      duracion: [this.movieService.moviewhere.duracion, Validators.required],
      director: [this.movieService.moviewhere.director, Validators.required],
      sinopsis: [this.movieService.moviewhere.sinopsis, Validators.required],
      portada: [this.movieService.moviewhere.portada, Validators.required],
      precio: [this.movieService.moviewhere.precio, Validators.required],
      url: [this.movieService.moviewhere.url, Validators.required]
    });
   }

   async updateMovie() {
    if (this.movieForm.valid) {
      const movie = this.movieForm.value;
      movie.id = this.movieService.moviewhere.id;
      this.movieService.updateMovie(movie).then(async (result)=>{
        if(result=='success'){
          console.log('Pelicula modificada exitosamente');
          const toast = await this.toastController.create({
            message: 'Pelicula modificada correctamente',
            duration: 2000, 
            position: 'top' 
          });
          toast.present();
          this.router.navigate(['/vista-admin']);
        }else{
          console.log('Error al guardar el pelicula');
        }
      })
      .catch(error =>{
        console.log('error')
      });
    }else {
      console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }
  }

}

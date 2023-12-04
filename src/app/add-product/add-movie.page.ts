import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage {
  public productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      photo: [''],
      type: ['', Validators.required],
    });
  }

  async saveProduct() {
    if (this.productForm.valid) {
      const movie = this.productForm.value;

      this.moviesService
        .addMovie(movie)
        .then(async (response) =>{
          if (response == "success") {
            console.log('Producto guardado exitosamente:', response);
            const toast = await this.toastController.create({
              message: 'Producto guardado correctamente',
              duration: 2000, // Duración de 2 segundos
              position: 'top', // Posición superior
            });
            toast.present();
          } else {
            console.log('Error al guardar el producto:', response);
          }
        })
        .catch((error) => {
          console.error('Error al guardar el producto:', error);
        });
    } else {
      console.warn(
        'El formulario no es válido. Por favor, completa todos los campos requeridos.'
      );
    }

    

    // Redirigir a la pestaña tab1
    this.router.navigate(['/tabs/tab1']);
  }
}
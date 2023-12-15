import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart-service.service';
import { Cart, Pelicula, CartItem, Library } from '../models/pelicula.model';
import { AlertController, ToastController } from '@ionic/angular';
import { LibraryService } from '../services/library.service';
import { map } from 'rxjs';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public cart: Cart = {
    items: [],
    total: 0,
    itemCount: 0
  };

  // public cart: { movie: Pelicula; quantity: number }[] = [];

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private movieService: MoviesService,
    private LibraryService: LibraryService,
    private toastController: ToastController
  ) {

  }

  // async ngOnInit(): Promise<void> {
  //   console.log('Ejecutando');
  //   await this.getCart();
  // }

  async ionViewWillEnter() {
    await this.getCart();
  }

  async getCart(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.cartService.getCart().subscribe(async (carrito: Cart) => {
        // console.log('Datos del carrito en obtenerCarrito:', carrito);

        if (carrito && carrito.items && carrito.items.length > 0) {
          const carritoDetails = await Promise.all((carrito?.items || []).map(async (item: CartItem) => {
            // Verifica que item.movie esté definido y tenga una propiedad id antes de acceder a ella
            if (item.movie && item.movie.id) {
              const movie = await this.movieService.getMovieById(item.movie.id);

              if (movie) {
                return {
                  items: [{
                    id: movie.id,
                    director: movie.director,
                    titulo: movie.titulo,
                    duracion: movie.duracion,
                    genero: movie.genero,
                    portada: movie.portada,
                    precio: movie.precio,
                    sinopsis: movie.sinopsis,
                    comentarios: movie.comentarios,
                    url: movie.url
                  }],
                  quantity: item.quantity || 0
                };
              } else {
                // Manejar el caso en que no se pueda obtener el producto
                console.error('Error: No se pudo obtener la película con id', item.movie.id);
                return null;
              }
            } else {
              console.error('Error: movie o id es undefined en el elemento del carrito.', item);
              return null;
            }
          }));

          // Filtrar los valores nulos y actualizar la propiedad 'cart'
          const filteredCartDetails = carritoDetails.filter((item) => item !== null) as {
            items: { id: string; director: string; titulo: string; duracion: string; genero: string; portada: string; precio: number; sinopsis: string; comentarios: []; url: string; }[];
            quantity: number;
          }[];

          // Calcular el total y la cantidad de artículos del carrito
          const total = filteredCartDetails.reduce((acc, item) => acc + item.quantity * item.items[0].precio, 0);
          const itemCount = filteredCartDetails.reduce((acc, item) => acc + item.quantity, 0);

          this.cart = {
            items: filteredCartDetails.map(item => ({
              movie: {
                id: item.items[0].id,
                director: item.items[0].director,
                titulo: item.items[0].titulo,
                duracion: item.items[0].duracion,
                genero: item.items[0].genero,
                portada: item.items[0].portada,
                precio: item.items[0].precio,
                sinopsis: item.items[0].sinopsis,
                comentarios: item.items[0].comentarios,
                url: item.items[0].url
              },
              quantity: item.quantity
            })),
            total: total,
            itemCount: itemCount
          };
        } else {
          // Manejar el caso en que no hay productos en el carrito
          this.cart = {
            items: [],
            total: 0,
            itemCount: 0
          };
        }
      });
    });
  }



  async promptRemoveItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Eliminar Pelicula',
      message: `¿Desea eliminar ${item.movie?.titulo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: (data) => {
            const quantityToRemove = 1;
            if (quantityToRemove >= 0 && item.movie) {  // Asegúrate de que item.movie no sea undefined
              console.log('Cantidad:' + quantityToRemove);
              this.cartService.removeItemFromCart(this.cart, item, quantityToRemove);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  async realizarPago() {
    // Llamada al servicio para realizar la compra
    await this.cartService.realizarCompra(this.cart);
    this.cart = {
      items: [],
      total: 0,
      itemCount: 0
    };
  
    // Mostrar mensaje
    this.mostrarMensaje('Pago realizado con éxito');
  } 

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000, // Duración del mensaje en milisegundos
      position: 'bottom', // Posición del mensaje en la pantalla
    });
    toast.present();
  }


  public addMovieToLibrary(movie: Pelicula): void {
    this.LibraryService.createLibrary().then((doc) => {
      console.log('Libreria creada' + doc);
      this.LibraryService.addMovieToLibrary(movie, doc);
    }
    )
  }

}

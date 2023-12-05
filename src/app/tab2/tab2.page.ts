import { Component } from '@angular/core';
import { CartService } from '../services/cart-service.service';
import { Cart, Pelicula, CartItem, Library } from '../models/pelicula.model';
import { AlertController } from '@ionic/angular';
import { LibraryService } from '../services/library.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public cart: Cart;

  constructor(private cartService: CartService, private alertController: AlertController, private LibraryService: LibraryService) {
    this.cart = this.cartService.getCart();
  }

  async promptRemoveItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: `¿Cuántos ${item.movie.titulo} deseas eliminar?`,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          max: item.quantity,
          value: '1', // Valor predeterminado
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: (data) => {
            const quantityToRemove = parseInt(data.quantity, 10);
            if (quantityToRemove > 0) {
              this.cartService.removeItemFromCart(item, quantityToRemove);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  public addMovieToLibrary(movie: Pelicula): void {
    this.LibraryService.createLibrary().then((doc) => {
      console.log('Libreria creada' + doc);
      this.LibraryService.addMovieToLibrary(movie, doc);
    }
    )
  }

}

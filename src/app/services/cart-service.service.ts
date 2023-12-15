import { Injectable } from '@angular/core';
import { Cart, Pelicula, CartItem, Purchase } from '../models/pelicula.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, catchError, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from 'firebase/auth';
import { map } from 'rxjs';
import firebase from 'firebase/compat/app';
import { CompraService } from './compra.service';

interface CarritoDoc {
  items?: any[]; // Ajusta esto según la estructura real de tus documentos
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = {
    items: [],
    total: 0,
    itemCount: 0
  };

  private cartHistorial: Observable<CarritoDoc[]>;

  private cartCollection: AngularFirestoreCollection<Cart>;

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private compraService: CompraService
  ) {
    this.cartCollection = this.firestore.collection<Cart>('carrito');
    this.cartHistorial = this.cartCollection.valueChanges() as Observable<CarritoDoc[]>;
  }

  public getCartH(): Observable<CarritoDoc[]> {
    return this.cartHistorial;
  }

  public getCart(): Observable<Cart> {
    const nombreUsuario = this.userService.getCurrentUser()?.displayName?.toString();
    console.log('Nombre: ' + nombreUsuario);

    if (!nombreUsuario) {
      console.error('Nombre de usuario no válido.');
      // Return an observable with an empty Cart object if no username is available
      return of({
        items: [],
        total: 0,
        itemCount: 0
      });
    }

    const carritoDocRef = this.firestore.collection('carrito').doc(nombreUsuario);

    return carritoDocRef.valueChanges().pipe(
      map((carritoFirestore: any) => {
        if (!carritoFirestore || !carritoFirestore.items) {
          console.error('No hay productos en el carrito.');
          // Return an observable with an empty Cart object if no products are available
          return {
            items: [],
            total: 0,
            itemCount: 0
          };
        }

        return {
          items: carritoFirestore.items.map((item: { id: string, quantity: number }) => {
            return {
              movie: {
                id: item.id,
              },
              quantity: item.quantity || 0
            } as CartItem;
          }),
          total: carritoFirestore.total,
          itemCount: carritoFirestore.itemCount
        };

      }),
      catchError((error) => {
        console.error('Error al obtener datos del carrito:', error);
        // Return an observable with an empty Cart object in case of an error
        return of({
          items: [],
          total: 0,
          itemCount: 0
        });
      })
    );
  }



  buyProducts(cart: Cart): Promise<string> {
    return this.cartCollection.add(cart)
      .then((doc) => {
        console.log('Productos comprados' + doc.id);
        this.cart = {
          items: [],
          total: 0,
          itemCount: 0
        };
        return 'success'
      })
      .catch((error) => {
        console.log('error de:' + error);
        return 'Error'
      });
  }

  public async addToCart(movie: Pelicula): Promise<Cart> {
    const existingCartItemIndex = this.cart.items.findIndex((item) => item.movie.id === movie.id);

    if (existingCartItemIndex !== -1) {
      // La película ya está en el carrito, aumenta la cantidad en 1
      //this.cart.items[existingCartItemIndex].quantity += 1;
    } else {
      // La película no está en el carrito, agrégala como un nuevo elemento
      const newItem: CartItem = {
        movie: movie,
        quantity: 1,
      };
      this.cart.items.push(newItem);
    }

    const nombreUsuario = this.getUsuario()?.displayName;

    if (nombreUsuario) {
      await this.actualizarCarritoFirestore(nombreUsuario, this.cart);
    }

    // Actualiza el total y la cantidad de artículos
    this.cart.total = this.calculateTotal(this.cart);
    this.cart.itemCount = this.calculateItemCount(this.cart);

    return this.cart;
  }



  public async actualizarCarritoFirestore(nombreUsuario: string | undefined, carrito: Cart): Promise<void> {
    const carritoDocRef = this.firestore.collection('carrito').doc(nombreUsuario);

    // Asegurar que carrito.items esté definido y no esté vacío antes de mapearlo
    const items = carrito.items && carrito.items.length
      ? carrito.items.map(item => ({ id: item.movie.id, quantity: item.quantity }))
      : [];

    // Asegurar que otros campos requeridos estén definidos
    const carritoData = {
      user: nombreUsuario,
      items: items,
      total: carrito.total !== undefined ? carrito.total : 0, // Proporcionar un valor predeterminado si carrito.total es undefined
      itemCount: carrito.itemCount !== undefined ? carrito.itemCount : 0, // Proporcionar un valor predeterminado si carrito.itemCount es undefined
    };

    // Verificar que todos los campos críticos estén definidos antes de intentar actualizar Firestore
    if (nombreUsuario && carritoData.items !== undefined && carritoData.total !== undefined && carritoData.itemCount !== undefined) {
      try {
        await carritoDocRef.set(carritoData, { merge: true });
      } catch (error) {
        console.error('Error al actualizar el carrito en Firestore:', error);
      }
    } else {
      console.error('Error: Alguno de los campos críticos es undefined. No se pudo actualizar Firestore.');
    }
  }




  getUsuario() {
    return this.userService.getCurrentUser();
  }

  private calculateTotal(cart: Cart): number {
    return cart.items.reduce((total, item) => total + item.movie.precio * item.quantity, 0);
  }

  private calculateItemCount(cart: Cart): number {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }

  public async removeItemFromCart(cart: Cart, item: CartItem, quantityToRemove: number): Promise<void> {
    const nombreUsuario = this.userService.getCurrentUser()?.displayName?.toString();

    console.log('Carrito antes de la eliminación:', cart);

    // Utiliza findIndex con una comparación personalizada
    const index = cart.items.findIndex((cartItem) => this.isSameMovie(cartItem.movie, item.movie));

    console.log('Index:', index);

    if (index !== -1 && cart.items[index]?.quantity !== undefined) {
      console.log('Antes de la actualización:', cart.items[index].quantity);

      // Asegúrate de que la cantidad a eliminar sea menor o igual a la cantidad en el carrito
      if (quantityToRemove < cart.items[index].quantity) {
        // Si la cantidad a eliminar es menor que la cantidad en el carrito, simplemente actualiza la cantidad.
        cart.items[index].quantity -= quantityToRemove;
      } else {
        // Si la cantidad a eliminar es mayor o igual a la cantidad en el carrito, elimina el elemento por completo.
        cart.items.splice(index, 1);
      }

      console.log('Después de la actualización:', cart.items[index]?.quantity);

      // Actualiza el total y la cantidad de artículos
      cart.total = this.calculateTotal(cart);
      cart.itemCount = this.calculateItemCount(cart);

      // Actualiza la cantidad en Firestore
      this.actualizarCarritoFirestore(nombreUsuario, cart);
    } else {
      console.log('No se encontró el ítem en el carrito o la cantidad es undefined.');
    }

    console.log('Carrito después de la eliminación:', cart);
  }



  private isSameMovie(movie1: Pelicula, movie2: Pelicula): boolean {
    // Compara los IDs de las películas para determinar si son iguales
    return movie1?.id === movie2?.id;
  }


  public async realizarCompra(cart: Cart): Promise<void> {
    const nombreUsuario = this.userService.getCurrentUser()?.displayName?.toString();
    // Registra la compra
    const compra: Purchase = {
      fecha: new Date(),
      user: nombreUsuario, // Agrega el nombre del usuario
      productos: {
        items: cart.items, 
        total: cart.total,
        itemCount: cart.itemCount
      }, // Clonar los productos en el carrito para la compra
    };

    // Agrega la compra a la colección "compras" en Firestore
    await this.compraService.agregarCompra(compra);

    if (nombreUsuario) {
      this.cart = {
        items: [],
        total: 0,
        itemCount: 0
      };
      await this.actualizarCarritoFirestore(nombreUsuario, this.cart);
    }
  }

}
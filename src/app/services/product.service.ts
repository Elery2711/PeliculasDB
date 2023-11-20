import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Observable<Product[]>;

  private productoCollection: AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore) {
    /*this.products.push({
      name: "Aguacate",
      price: 100,
      description: "Lorem ipsum dolor sit amet.",
      type: "Frutas y Verduras",
      photo: "https://picsum.photos/500/300?random",
    });
    this.products.push({
      name: "Coca Cola",
      price: 20,
      description: "Lorem ipsum dolor sit amet.",
      type: "Abarrotes",
      photo: "https://picsum.photos/500/300?random"
    });
    this.products.push({
      name: "Jabón Zote",
      price: 40,
      description: "Lorem ipsum dolor sit amet.",
      type: "Limpieza",
      photo: "https://picsum.photos/500/300?random"
    });
    this.products.push({
      name: "Aspirina",
      price: 50,
      description: "Lorem ipsum dolor sit amet.",
      type: "Farmacia",
      photo: "https://picsum.photos/500/300?random"
    });*/

    this.productoCollection = 
    this.firestore.collection<Product>('products');
    this.products = 
    this.productoCollection.valueChanges();
  }

  saveProduct(product: Product): Promise<String> {
    return this.productoCollection.add(product)
    .then((doc) => {
      console.log("Producto añadido con id: "+doc.id)
      return doc.id;
    })
    .catch(error => {
      console.log("Error al añadir el producto: "+error);
      return error;
    });
  }

  getProducts(): Observable<Product[]> {
    return this.products;
  }
}

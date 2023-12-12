import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Cart, Purchase } from '../models/pelicula.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private comprasCollection: AngularFirestoreCollection<any>;
  private historialCompras: { fecha: Date, user: string | undefined, productos: Cart }[] = [];
  private historialComprasSubject: BehaviorSubject<{ fecha: Date, user: string | undefined, productos: Cart }[]> = new BehaviorSubject(this.historialCompras);

  constructor(private firestore: AngularFirestore) {
    this.comprasCollection = this.firestore.collection('compras');
  }

  public async agregarCompra(compra: Purchase): Promise<void> {
    await this.comprasCollection.add(compra);
  }

  public agregarAlHistorialCompra(productos: { fecha: Date, user: string | undefined, productos: Cart }[]): void {
    this.historialCompras.push(...productos);
    this.historialComprasSubject.next(this.historialCompras);
  }

  obtenerHistorialCompras(nombreUsuario: string | undefined): Observable<any[]> {
    return this.comprasCollection.valueChanges().pipe(
      map(historialCompras => historialCompras
        .filter(compra => compra.user === nombreUsuario)
        .sort((a, b) => b.fecha.toMillis() - a.fecha.toMillis())
      )
    );
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompraService } from '../services/compra.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnDestroy {
  historialCompras: any[] = [];
  historialComprasSubscription: Subscription | undefined;

  constructor(
    private compraService: CompraService, 
    private userService: UserService
  ) { }

  async ionViewWillEnter() {
    await this.cargarHistorialCompras();
  }

  cargarHistorialCompras(): void {
    const nombreUsuario = this.userService.getCurrentUser()?.displayName?.toString();
    this.historialComprasSubscription = this.compraService.obtenerHistorialCompras(nombreUsuario)
      .subscribe({
        next: (historialCompras) => {
          this.historialCompras = historialCompras.map(compra => {
            return { ...compra, fecha: this.formatearFecha(compra.fecha) };
          });
        },
        error: (error) => {
          console.error('Error al cargar el historial de compras:', error);
        },
      });
  }

  calcularTotalCompra(productos: any[]): number {
    return productos.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  formatearFecha(fecha: any): string {
    const date = fecha.toDate();
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const fechaFormateada = date.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = date.toLocaleTimeString('es-ES', opcionesHora);
    return `${fechaFormateada} ${horaFormateada}`;
  }

  ngOnDestroy(): void {
    if (this.historialComprasSubscription) {
      this.historialComprasSubscription.unsubscribe();
    }
  }
}

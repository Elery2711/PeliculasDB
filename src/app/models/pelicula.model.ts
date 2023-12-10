export interface Pelicula {
  id?: string;
  titulo: string;
  genero: string;
  duracion: string;
  director: string;
  sinopsis: string;
  portada: string;
  precio: number;
  comentarios?: string[];
}

export interface CartItem {
  movie: Pelicula;  // Product es la interfaz que ya definiste para los productos
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Library {
  items: Pelicula[];
  user: string;
}
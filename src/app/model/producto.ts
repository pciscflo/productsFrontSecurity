import {TipoProducto} from "./tipo-producto";

export class Producto {
  id: number;
  descripcion: string;
  precio: number;
  stock: number;
  tipoProducto: TipoProducto;
}
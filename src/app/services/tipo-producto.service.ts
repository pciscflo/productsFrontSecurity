import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Producto} from "../model/producto";
import {TipoProducto} from "../model/tipo-producto";

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<TipoProducto[]>();

  constructor() { }

  list(): Observable<any>{
    return this.http.get<TipoProducto[]>(this.url + "/tipoProductos");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/tipoProducto/" + id)
    return this.http.get<Producto[]>(this.url + "/tipoProducto/" + id);
  }

  setList(listaNueva : TipoProducto[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList():Observable<TipoProducto[]> {
    return this.listaCambio.asObservable();
  }

}

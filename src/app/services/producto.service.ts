import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Producto} from "../model/producto";


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = environment.apiUrl  + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Producto[]>();

  constructor() { }

  list(): Observable<any>{
    return this.http.get<Producto[]>(this.url + "/productos");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/producto/" + id)
    return this.http.get<Producto[]>(this.url + "/producto/" + id);
  }
  insert(producto: Producto): Observable<any>{
    return this.http.post(this.url + "/producto", producto);
  }
  update(producto: Producto): Observable<any>{
    return this.http.put(this.url + "/producto", producto);
  }
  delete(id: number) {
    return this.http.delete(this.url + "/producto/" + id);
  }
  setList(listaNueva : Producto[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList():Observable<Producto[]> {
    return this.listaCambio.asObservable();
  }

}

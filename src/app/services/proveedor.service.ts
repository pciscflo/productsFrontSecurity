import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Proveedor} from "../model/proveedor";

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Proveedor[]>();

  constructor() { }

  list(): Observable<any>{
    return this.http.get<Proveedor[]>(this.url + "/proveedores");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/proveedor/" + id)
    return this.http.get<Proveedor[]>(this.url + "/proveedor/" + id);
  }
  insert(proveedor: Proveedor): Observable<any>{
    return this.http.post(this.url + "/proveedor", proveedor);
  }
  update(proveedor: Proveedor): Observable<any>{
    return this.http.put(this.url + "/proveedor", proveedor);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/proveedor/" + id);
  }
  setList(listaNueva : Proveedor[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }

}

import { Routes } from '@angular/router';
import {HomeComponent} from "./componente/home/home.component";
import {AcercaComponent} from "./componente/acerca/acerca.component";
import {ProveedorListarComponent} from "./componente/proveedor-listar/proveedor-listar.component";
import {ProveedorNuevoEditComponent} from "./componente/proveedor-nuevo-edit/proveedor-nuevo-edit.component";
import {Proveedor} from "./model/proveedor";
import {ProductoComponent} from "./componente/producto/producto.component";
import {LoginComponent} from "./componente/login/login.component";

export const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'acerca', component: AcercaComponent},
  {path: 'proveedores', component: ProveedorListarComponent},
  {path: 'nuevo', component: ProveedorNuevoEditComponent},
  {path: 'nuevo-edit/:id', component: ProveedorNuevoEditComponent},
  {path: 'nuevo-producto', component: ProductoComponent}
];

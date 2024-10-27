import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ProveedorService} from "../../services/proveedor.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Proveedor} from "../../model/proveedor";
import {Producto} from "../../model/producto";
import {ProductoService} from "../../services/producto.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {TipoProducto} from "../../model/tipo-producto";
import {TipoProductoService} from "../../services/tipo-producto.service";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  productoForm: FormGroup;
  fb = inject(FormBuilder);
  productoService: ProductoService = inject(ProductoService);
  tipoProductoService: TipoProductoService = inject(TipoProductoService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0
  public idTipoProductoSeleccionado: number = 0;
  lista: TipoProducto[] = [];
  tipoProducto: TipoProducto = new TipoProducto();

  constructor() {
    console.log("Constructor ProveedorNuevoEditComponent")
    this.productoForm = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      tipoProducto: ['', Validators.required],
    })
  }


  ngOnInit(): void { //sólo una vez luego del constructor
    console.log("ngOnInit de ProductoComponent, Load Lista de Tipos Productos")
    this.loadLista();
  }

  loadLista(): void {
    this.tipoProductoService.list().subscribe({
      next: (data: TipoProducto[]) => {
        this.lista = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const producto: Producto = new Producto();
      producto.id = 0;
      producto.descripcion = this.productoForm.value.descripcion;
      producto.precio = this.productoForm.value.precio;
      producto.stock = this.productoForm.value.stock;
      producto.tipoProducto = this.tipoProducto;
      producto.tipoProducto.id = this.productoForm.value.tipoProducto;
      console.log("Producto validado para registrar:", producto);
        this.productoService.insert(producto).subscribe({
          next: (data: Object): void => {
            console.log("Producto registrado:", data);
          }
        })
       alert("Producto registrado!")
      this.router.navigate([''])
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
}

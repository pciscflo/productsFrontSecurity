import {Component, createComponent, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Proveedor} from "../../model/proveedor";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {ProveedorService} from "../../services/proveedor.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-proveedor-nuevo-edit',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatCardContent, MatLabel, MatHint, //add
    MatDatepickerModule,//add
    MatNativeDateModule, //add
    MatInputModule //add
  ],
  templateUrl: './proveedor-nuevo-edit.component.html',
  styleUrl: './proveedor-nuevo-edit.component.css'
})
export class ProveedorNuevoEditComponent {
  proveedorForm: FormGroup;
  fb = inject(FormBuilder);
  proveedorService: ProveedorService = inject(ProveedorService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0

  constructor() {
    console.log("Constructor ProveedorNuevoEditComponent")
    this.proveedorForm = this.fb.group({
      idProveedor: [''],
      nombre: ['', Validators.required],
      fechaInscripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^\\d{9}$")]],
      email: ['', [Validators.required, Validators.email]],
    })
  }


  ngOnInit(): void { //sólo una vez luego del constructor
      this.route.params.subscribe((data: Params) => {
        console.log("ngOnInit de ProveedorNuevoEditComponent")
        console.log(data);
        this.id = data['id']; //capturando el id del listado
        this.edicion = data['id'] != null;//true, false
        this.cargaForm();
     });
  }
  cargaForm() {
    if (this.edicion) {
      this.proveedorService.listId(this.id).subscribe((data: Proveedor) => {
        console.log(data);
        this.proveedorForm.patchValue({
          nombre: data.nombre,
          fechaInscripcion: data.fechaInscripcion,
          telefono: data.telefono,
          direccion: data.direccion,
          email: data.email
        });
      });
    } //del if
  } // de cargaForm

  onSubmit() {
    if (this.proveedorForm.valid) {
      const proveedor: Proveedor = new Proveedor();
      proveedor.idProveedor = this.id;
      proveedor.nombre = this.proveedorForm.value.nombre;
      proveedor.fechaInscripcion = this.proveedorForm.value.fechaInscripcion;
      proveedor.telefono = this.proveedorForm.value.telefono;
      proveedor.direccion = this.proveedorForm.value.direccion;
      proveedor.email = this.proveedorForm.value.email;
      if (!this.edicion) {
        console.log("Datos aceptado:", proveedor);
        this.proveedorService.insert(proveedor).subscribe((data: Object): void => {
            console.log("Datos insertados:", data);
        }
        );
      } else {
        //update
        console.log("Datos aceptado:", proveedor);
        this.proveedorService.update(proveedor).subscribe((data: Object): void => {
           console.log("Datos actualizados:", data);
          }
        );
      }
      this.router.navigate(['proveedores']);
    } else {
      console.log("Formulario no valido");
    }
  }
}

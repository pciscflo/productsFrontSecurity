import {AfterViewInit, Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {Proveedor} from "../../model/proveedor";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ProveedorService} from "../../services/proveedor.service";
import {Router, RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ConfirmDialogoComponent} from "./confirm-dialogo/confirm-dialogo.component";

@Component({
  selector: 'app-proveedor-listar',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink
  ],
  templateUrl: './proveedor-listar.component.html',
  styleUrl: './proveedor-listar.component.css'
})
export class ProveedorListarComponent implements OnInit, AfterViewInit {

  lista: Proveedor[] = [];
  displayedColumns = ['idProveedor', 'nombre', 'fechaInscripcion', 'direccion', 'telefono', 'email', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Proveedor> = new MatTableDataSource<Proveedor>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  proveedorService: ProveedorService = inject(ProveedorService);
  route: Router = inject(Router);
  dialog = inject(MatDialog)

  constructor() {
    console.log("Load constructor")
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Load Lista!");
    // Suscribirse al observable de la lista de proveedores
    this.proveedorService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.proveedorService.list().subscribe({
      next: (data) => {
        this.proveedorService.setList(data); //enviar la nueva lista a los suscriptores
      },
      error: (err) => console.error("Error en consulta", err)
    })
  }

  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  delete(id:number) {
    this.proveedorService.delete(id).subscribe(() => {
      this.proveedorService.list().subscribe(data => {
        this.proveedorService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }

}


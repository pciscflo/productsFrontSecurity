// src/app/login/login.component.ts
import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {ProductoService} from "../../services/producto.service";
import {TipoProductoService} from "../../services/tipo-producto.service";
import {LoginService} from "../../services/login.service";
import {Producto} from "../../model/producto";
import {RequestDto} from "../../model/request-dto";
import {ResponseDto} from "../../model/response-dto";


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, MatButton, MatCard, MatCardContent, MatCardTitle, MatFormField, MatInput, MatLabel, MatOption, MatSelect, ReactiveFormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
     console.log("Form");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto()
      requestDto.username = this.loginForm.value.username;
      requestDto.password = this.loginForm.value.password;
      let responseDTO: ResponseDto = new ResponseDto();
      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto): void => {
          console.log("Login response ROLs:", data.roles);
          console.log("Login response ROL:", data.roles[0]);
          localStorage.setItem('rol', data.roles[0]);
        },
        error: (error: any) => {
          console.error(error);
          this.router.navigate(['login']);
        }
      })
      alert("Login ok!")
      this.router.navigate(['/home'])
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
}

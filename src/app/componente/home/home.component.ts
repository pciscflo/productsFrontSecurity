import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor( private router: Router) {}

  onLogout() {
    //this.authService.logout();
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        matgin: 10px;
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  get auth() { // Al constructor ingectem el AuthService, així que podem fer aquí un get per obtenir  el get del Auth.service.ts
    return this.authService.auth;
  }

  constructor( private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
  }

  logout() {

    this.router.navigate(['./auth']);

  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authService: AuthService,
               private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      /*if( this.authService.auth.id ) {
        return true;
      }

      console.log('Bloqueado por el AuthGuard - CanActivate');
      return false;*/

      return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if( !estaAutenticado ) {
                    this.router.navigate(['./auth/login'])
                  }
                })
              );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if( !estaAutenticado ) {
                    this.router.navigate(['./auth/login'])
                  }
                })
              );
      
      /*console.log('canLoad', true);
      console.log(segments)
      if( this.authService.auth.id ) {
        return true;
      }

      console.log('Bloqueado por el AuthGuard - CanLoad');
      return false;*/
    }
}

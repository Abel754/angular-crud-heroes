import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth', // Si el path és auth, carregarem les rutes filles (auth-routing.module que està dins de auth.module)
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ), // Aquesta sintaxis s'escriu d'aquesta manera. Quan es carregui, retorna AuthModule,,
  },
  {
    path: 'heroes', // Si el path és auth, carregarem les rutes filles (auth-routing.module que està dins de auth.module)
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ), // Aquesta sintaxis s'escriu d'aquesta manera. Quan es carregui, retorna AuthModule
    canLoad: [ AuthGuard ], // Importem el guard per protegir les rutes i saber si puc accedir
    canActivate: [ AuthGuard ] // També importem l'altre mètode canActivate. Si refresquem el navegador, es perdrà la sessió
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

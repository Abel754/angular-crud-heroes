import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth', // Si el path és auth, carregarem les rutes filles (auth-routing.module que està dins de auth.module)
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) // Aquesta sintaxis s'escriu d'aquesta manera. Quan es carregui, retorna AuthModule
  },
  {
    path: 'heroes', // Si el path és auth, carregarem les rutes filles (auth-routing.module que està dins de auth.module)
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ) // Aquesta sintaxis s'escriu d'aquesta manera. Quan es carregui, retorna AuthModule
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

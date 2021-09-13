import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() { // Hem de fer un get perquè el :auth és private i necessitem accedir a ell des d'altres classes
    return { ...this._auth };
  }

  constructor( private http: HttpClient ) { }
  

  verificaAutenticacion(): Observable<boolean> {
    if( !localStorage.getItem('id') ) {
      return of(false); // Com que retornem true o false i és unObservable i no deixaria, hem d'importar l'of
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
          .pipe(
            map( auth => {
              console.log('map', auth);
              return true;
            } )
          );
  }


  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe( // Abans de que arribi al lloc on és cridat aquest mètode, s'exeutarà el pipe
        tap( auth => this._auth = auth ), // Assigna la resposta del login a la propietat privada d'aqueta classe, _auth i ho envia al login(on és cridat)
        tap( auth => localStorage.setItem('id', auth.id) ) // Guarda la id de l'usuari en el LocalStorage
      );
  }

}

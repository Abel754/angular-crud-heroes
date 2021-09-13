import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl; // Per control·lar si estarà en desarrollo (localhost) o en producción (un servidor)

  constructor( private http: HttpClient ) { } // Definit al app.module

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`); // Es pot utilitzar aquest link perquè hem instal·lat json-serveri hi ha una carpeta 05-heroes-server amb l'arxiu de la BD
  }

  getHeroePorId( id: string ):Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`); // Es pot utilitzar aquest link perquè hem instal·lat json-server i hi ha una carpeta 05-heroes-server amb l'arxiu de la BD
  }
  // buscar.component
  getSugerencias( termino: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`); // Json-server et permet passar paràmetres per la URL, en aquest cas la q busca el tipus d'heroe i el limit la quantitat de registres que truerà
  }

  // agregar.component
  agregarHeroe( heroe: Heroe ):  Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  actualizarHeroe( heroe: Heroe ):  Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe( id: string ):  Observable<any> { // No retornarà res
    return this.http.delete<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

}

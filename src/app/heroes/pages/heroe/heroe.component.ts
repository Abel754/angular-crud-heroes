import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap, tap } from "rxjs/operators";
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      .container {
        margin-top: 20px;
        padding: 20px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
    ) {} // ActivatedRoute ho necessitem quan venen valors per paràmetre (per exemple, una ID com en aquest cas)) { }

  ngOnInit(): void {
    this.activatedRoute.params // Accedim als params (el que ve per la URL) i agafem la ID
      .pipe(
        switchMap((param) => this.heroesService.getHeroePorId(param.id)), // param és el que ve per la URL
         tap( console.log ),
      )
      .subscribe((heroe) => { // Es subscriu perquè és un Observable (valors que venen canviant la URL)
        this.heroe = heroe
      })
  }

  regresar() { // També es pot utilitzar routerLink des del html
    this.router.navigate(['/heroes/listado']);
  }

}

import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px
      }
    `
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = []; // Aquí ve tota la informació de l'interfaç Heroe

  constructor( private heroesService: HeroesService ) { } // Utilitzem el service, que es pot utilitzar perquè està en el root de l'aplicació

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe( heroes => {
        this.heroes = heroes;
      })
  }

  

}

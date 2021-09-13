import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
    
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined; // Haurem de posar que podrà ser undefined perquè més abaix se li aplicarà undefined

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  buscando() {
    console.log(this.termino)
    // cada cop que escrigui una lletra, amb el ngModel de l'input, aquesta variable agafa el valor d'aquella (perquè es diuen igual)
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes)
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) { // MatAutocompleteSelectedEvent ve junt amb l'Autocomplete (buscar.component.ts)

    console.log(event.option.value)
    if(event.option.value === '' ) {
      this.heroeSeleccionado = undefined;
      console.log('no hay valor')
      return;
    }

    const heroe: Heroe = event.option.value; // Agafa el nom
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorId( heroe.id! )
      .subscribe( heroe => this.heroeSeleccionado = heroe );
  }

}

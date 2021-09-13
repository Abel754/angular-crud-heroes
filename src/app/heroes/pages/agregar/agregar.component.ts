import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [ // Aquests valors són trets de l'arxiu db.json de la carpeta 05-json-server
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  heroe: Heroe = { // Gràcies als ngModel dels inputs, s'associa cada input amb aquestes variables
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private _snackBar: MatSnackBar,
               private dialog: MatDialog ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) { // Executem aquest codi perquè hi ha diverses URL que accedeixen a aquest component. URLS per afegir heroi i per editar. Només hem d'executar el codi dels params a l'editar. Així, no sortiran errors a la consola del navegador
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe );
      
  }

  guardar() {
    //console.log(this.heroe)

    if (this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if( this.heroe.id ) {
      // Actualitzar
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnakbar('Registro actualizado'))
    } else {
      // Crear
      this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => { // Subscribe perquè és un Observable i modifica la URL
        this.router.navigate(['/heroes/editar', heroe.id])
        this.mostrarSnakbar('Registro creado')
      })
    }

  }

  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {  // Quan s'hagi de borrar el component, utilitzaré el dialog que és com una alerta
      width: '250px',
      data: this.heroe // Podem enviar informació al component ConfirmarComponent
    });

    dialog.afterClosed().subscribe( // Quan s'hagi tancat (sempre es tanca perquè així ho definim en els dos mètodes de confirmar.component). Però quan es tanca perquè es clica al botó borrar, enviem un true, aquest result és el true. Si el result és true, esborrarem
      (result) => {
        if ( result ) {
          this.heroesService.borrarHeroe( this.heroe.id! ) // Cridem al mètode del Service per esborrar
          .subscribe( resp => {
            this.router.navigate(['/heroes']);
            this.mostrarSnakbar('Registro borrado')
          })
        }
      }
    )
    
  }

  mostrarSnakbar( mensaje: string ) { // https://material.angular.io/components/snack-bar/examples
    this._snackBar.open( mensaje, 'ok!', { // Al cridar el mètode, enviarem el missatg personalitzat i el 'ok' és per tancar-lo, o es tanca en 2.5s
      duration: 2500
    } );
  }

}

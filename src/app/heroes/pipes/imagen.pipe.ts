import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false // Indiquem el pure en false perquè al editar la imatge en el agregar.component, abans de donar a guardar, ja es vegi la nova imatge. Pure en false fa que, qualsevol acció que es faci, actualitza els canvis en el Pipe
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    if( !heroe.id && !heroe.alt_img ) {
      return 'assets/no-image.png'
      
    } else if( heroe.alt_img ) {
      return heroe.alt_img;
    } else {
      return `assets/heroes/${heroe.id}.jpg`
    }
    
  }

}

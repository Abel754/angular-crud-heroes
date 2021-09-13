import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ConfirmarComponent>, // Va lligat al dialog, hem d'assignar una variable de tipus MatDialogRef<el-nom-de-la-classe>
               @Inject(MAT_DIALOG_DATA) public data: Heroe ) { } // Com que enviem informació amb data, hem de posar aquesta línea obligatòriament, l'únic que canvia és el data: en aquest cas serà de tipus Heroe perquè enviem l'objecte sencer

  ngOnInit(): void {
    console.log(this.data)
  }

  borrar() {
    this.dialogRef.close(true); // Si volem borrar, posarem un true
  }

  cerrar() {
    this.dialogRef.close();
  }

}

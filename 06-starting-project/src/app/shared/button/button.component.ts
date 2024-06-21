import { Component } from '@angular/core';

@Component({
   selector: 'button[appButton]', // attribute selector -> botones que tengan el atributo appButton
   standalone: true,
   imports: [],
   templateUrl: './button.component.html',
   styleUrl: './button.component.css',
})
export class ButtonComponent {}

/*
   ESTE PATRON SE USA P' EXTENDER ELEMENTOS Q YA ESTAN COMO LOS BOTONES

   en donde lo ocupo lo llamo

   <button appButton></button>


   ( COMO SEA LO TENGO QUE IMPORTAR EN DONDE LO ESTE OCUPANDO )
*/

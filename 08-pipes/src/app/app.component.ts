import { Component } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';
import { DecimalPipe } from '@angular/common';
import { SortPipe } from './sort.pipe';

@Component({
   selector: 'app-root',
   standalone: true,
   templateUrl: './app.component.html',
   imports: [TemperaturePipe, DecimalPipe, SortPipe],
})
export class AppComponent {
   currentDate = new Date();
   currentTemperaturs = {
      berlin: 4.2749812,
      newYork: 18.1214,
      paris: 72.1209001,
      chicago: 65.0775238,
   };

   historicTemperatures = [
      25, 37, 17, -4, 211, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
   ];

   onReset(index: number) {
      // p'q los pipes se vuelvan a correr con valores actualizados ( cuando son por referencia como en los arrays ) hay que cambiar TODO el array ( NO solo el item dentro ) p'q JS lo considere un array nuevo
      // this.historicTemperatures[index] = 18;

      const newTemps = [...this.historicTemperatures];
      newTemps[index] = 18;

      this.historicTemperatures = newTemps;
   }
}

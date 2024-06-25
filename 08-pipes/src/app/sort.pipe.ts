import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'sort',
   standalone: true,
   // pure: false, // p'q se corra denuevo cada q cambie algo en el template y no tener que cambiar todo el array en app.component.ts en onReset()
})
export class SortPipe implements PipeTransform {
   transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
      const sorted = [...value]; // p' crear copia, ya q' sort cambia el original 💥

      sorted.sort((a, b) => {
         if (direction === 'asc') {
            return a > b ? 1 : -1;
         } else {
            return a > b ? -1 : 1;
         }
      });

      return sorted;
   }
}

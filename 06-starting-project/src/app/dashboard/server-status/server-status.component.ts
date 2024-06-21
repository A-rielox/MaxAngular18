import {
   Component,
   DestroyRef,
   OnDestroy,
   OnInit,
   effect,
   inject,
   signal,
} from '@angular/core';

@Component({
   selector: 'app-server-status',
   standalone: true,
   imports: [],
   templateUrl: './server-status.component.html',
   styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
   currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
   // private interval?: NodeJS.Timeout;
   // si NO me acepta este tipo =>
   //private interval?: ReturnType<typeof setInterval>; // ✨📌

   // mas nueva opcion a onDestroy --------------> 💥
   private destroyRef = inject(DestroyRef);

   constructor() {
      // si dentro de "effect" pongo un Signal entonces me hace una suscripcion a la signal y se ejecuta cada que el valor cambie, si el componente se quita => se quita automaticamente la suscripcion ✨📌
      effect(() => {
         console.log(this.currentStatus());
      });
   }

   ngOnInit(): void {
      /* this.interval =*/
      const interval = setInterval(() => {
         const rnd = Math.random();

         if (rnd < 0.5) {
            this.currentStatus.set('online');
         } else if (rnd < 0.9) {
            this.currentStatus.set('offline');
         } else {
            this.currentStatus.set('unknown');
         }
      }, 2000);

      // mas nueva opcion a onDestroy --------------> 💥
      this.destroyRef.onDestroy(() => {
         clearInterval(interval);
      });
   }

   // ngOnDestroy(): void {
   //    clearTimeout(this.interval);
   // }
}

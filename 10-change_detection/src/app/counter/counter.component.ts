import { Component, NgZone, OnInit, inject, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
   selector: 'app-counter',
   standalone: true,
   templateUrl: './counter.component.html',
   styleUrl: './counter.component.css',
   imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit {
   private zone = inject(NgZone); // p' que NO corra change detection cuando ocurra el cambio 💥💥
   count = signal(0);

   get debugOutput() {
      console.log('[Counter] "debugOutput" binding re-evaluated.');
      return 'Counter Component Debug Output';
   }

   ngOnInit(): void {
      //  💥💥
      this.zone.runOutsideAngular(() => {
         setTimeout(() => {
            console.log('timer expired');
         }, 4000);
      });
   }

   onDecrement() {
      this.count.update((prevCount) => prevCount - 1);
   }

   onIncrement() {
      this.count.update((prevCount) => prevCount + 1);
   }
}

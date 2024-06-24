import { Directive } from '@angular/core';

@Directive({
   selector: 'a[appSafeLink]',
   standalone: true,
   host: {
      '(click)': 'onConfirmLeavePage($event)',
   },
})
export class SafeLinkDirective {
   constructor() {
      console.log('safe link directive is active!');
   }

   onConfirmLeavePage(event: MouseEvent) {
      const wantsToLeave = window.confirm('Do you want to leave the page ?'); // retorna true o false

      if (wantsToLeave) return;

      event.preventDefault();
   }
}

import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
   selector: 'a[appSafeLink]',
   standalone: true,
   host: {
      '(click)': 'onConfirmLeavePage($event)',
   },
})
export class SafeLinkDirective {
   // queryParam = input('myapp'); // 'myapp' va a ser el valor default
   // p' ocuparlo como : <a href="https://angular.dev" appSafeLink queryParam="myapp-docs-link"

   queryParam = input('myapp', { alias: 'appSafeLink' });
   // p' ocuparlo como: <a href="https://angular.dev" appSafeLink="myapp-docs-link"

   private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef); // p' tener acceso al elemento desde el q se llama ( el <a> )

   onConfirmLeavePage(event: MouseEvent) {
      const wantsToLeave = window.confirm('Do you want to leave the page ?'); // retorna true o false

      if (wantsToLeave) {
         // const address = (event.target as HTMLAnchorElement).href;
         // (event.target as HTMLAnchorElement).href =
         //    address + '?from=' + this.queryParam();

         // con el elementRef
         const address = this.hostElementRef.nativeElement.href;
         this.hostElementRef.nativeElement.href =
            address + '?from=' + this.queryParam();

         return;
      }

      event.preventDefault();
   }
}

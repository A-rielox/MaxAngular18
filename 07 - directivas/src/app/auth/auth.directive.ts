import {
   Directive,
   TemplateRef,
   ViewContainerRef,
   effect,
   inject,
   input,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
   selector: '[appAuth]',
   standalone: true,
})
export class AuthDirective {
   userType = input.required<Permission>({ alias: 'appAuth' });
   private authService = inject(AuthService);
   private templateRef = inject(TemplateRef); // p'acceder al elemento en q la pongo y lo q tenga dentro 💥
   private viewContainerRef = inject(ViewContainerRef);

   constructor() {
      effect(() => {
         if (this.authService.activePermission() === this.userType()) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
         } else {
            this.viewContainerRef.clear();
         }
      });
   }
}

/*  💥
   <ng-template appAuth="admin">
         <p>Solo admins</p>
   </ng-template>
*/

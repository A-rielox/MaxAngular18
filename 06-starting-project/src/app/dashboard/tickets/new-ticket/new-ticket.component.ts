import {
   AfterViewInit,
   Component,
   ElementRef,
   OnInit,
   ViewChild,
   output,
   viewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-new-ticket',
   standalone: true,
   templateUrl: './new-ticket.component.html',
   styleUrl: './new-ticket.component.css',
   imports: [ButtonComponent, ControlComponent, FormsModule],
})
export class NewTicketComponent implements AfterViewInit, OnInit {
   add = output<{ title: string; text: string }>(); // en lugar de usar @Output()

   // @ViewChild('form') private formRef?: ElementRef<HTMLFormElement>;
   // la nueva form con Signal
   // private formRef = viewChild<ElementRef<HTMLFormElement>>('form');
   // con required p' quitar el ? de this.formRef()?.nativeElement.reset();
   private formRef = viewChild.required<ElementRef<HTMLFormElement>>('form');

   ngOnInit(): void {
      console.log(this.formRef().nativeElement, 'oninit');
   }

   // 💥
   ngAfterViewInit() {
      // aqui esta garantizado el acceso a lo seleccionado con @ViewChild, si lo selecciono con viewChild ( y no con @ViewChild ) => tambien tengo acceso desde OnInit
      console.log(this.formRef().nativeElement, 'AfterViewInit');
   }
   // lo mismo p' ngAfterContentInit si estoy usando content projection

   onSubmit(titleInput: string, textInput: string) {
      this.add.emit({ title: titleInput, text: textInput });

      // this.formRef?.nativeElement.reset();
      this.formRef().nativeElement.reset();
   }
}

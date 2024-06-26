// prettier-ignore
import { Component, ContentChild, ElementRef, HostBinding, HostListener, ViewEncapsulation, contentChild, inject, input } from '@angular/core';

@Component({
   selector: 'app-control',
   standalone: true,
   imports: [],
   templateUrl: './control.component.html',
   styleUrl: './control.component.css',
   encapsulation: ViewEncapsulation.None,
   host: {
      class: 'control', // me anade la clase al host y asi quito el <p class="control"> q envolvia todo, al poner esta clase en el host, no me agarra lo que ponga en el css de aca, porque ese archivo vale solo para lo que esta dentro del host, para ocuparlo asi tengo q tener el encapsulation: ViewEncapsulation.None, o el estilo en style.css
      '(click)': 'onClick()', // p' event-binding en el host
   },
})
export class ControlComponent {
   label = input.required<string>();

   // @ViewChild o ...Children solo sirve para elementos que estan en el template, en este caso mi template usa proyection con <ng-content /> para "sacar" estos necesito @ContentChild
   // @ContentChild('input') private ctrl?: ElementRef<HTMLTextAreaElement | HTMLInputElement>;
   // con Signal
   private ctrl =
      contentChild<ElementRef<HTMLTextAreaElement | HTMLInputElement>>('input');
   // este 'input' es el #input q pongo en el textarea o input

   // @HostBinding('class') className = 'control';
   // @HostListener('click') onClick() {
   //    console.log('clicked!!!');
   // }

   private el = inject(ElementRef); // p' acceder al host de forma programmatically

   onClick() {
      console.log(this.el.nativeElement); // p' acceder al host de forma programmatically
   }
}

/*

x+q en <ng-content> me ponga input o textarea dentro , angular como se fija en el codigo no lo va  a agarrar ( como si tuviera un label o input adentro ) asi que pongo el "encapsulation: ViewEncapsulation.None," para que los agarre ya que hace los estilos globales

con encapsulation: ViewEncapsulation.None, NO funciona el :host

<p class="control">
   <label>{{ label() }}</label>

   <ng-content select="input, textarea" />
   <!--cualquiera de los 2 tags-->
</p>

.control label {
   display: block;
   font-size: 0.8rem;
   font-weight: bold;
   margin-bottom: 0.15rem;
   color: #4f4b53;
}

.control input,
.control textarea {
   width: 100%;
   padding: 0.5rem;
   border: 1px solid #ccc;
   border-radius: 4px;
   font: inherit;
   font-size: 0.9rem;
   color: #4f4b53;
}



*/

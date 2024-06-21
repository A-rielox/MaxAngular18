import { TitleCasePipe } from '@angular/common';
import {
   Component,
   EventEmitter,
   Input,
   Output,
   computed,
   input,
} from '@angular/core';
import { CardComponent } from '../shared/card/card.component';

export interface User {
   id: string;
   avatar: string;
   name: string;
}

@Component({
   selector: 'app-user',
   standalone: true,
   templateUrl: './user.component.html',
   styleUrl: './user.component.css',
   imports: [TitleCasePipe, CardComponent],
})
export class UserComponent {
   @Input({ required: true }) user!: User;
   @Input({ required: true }) selected!: boolean;
   @Output() select = new EventEmitter<string>();

   // estos input son solo readOnly asi q no se puede ocupar un vatar.set('otto_nombre')
   // avatar = input.required<string>();
   // name = input.required<string>();

   get imagePath() {
      return `assets/users/${this.user.avatar}`;
   }
   // imagePath = computed(() => {
   //    return `assets/users/${this.avatar()}`;
   // });

   onSelectedUser() {
      this.select.emit(this.user.id);
   }
}

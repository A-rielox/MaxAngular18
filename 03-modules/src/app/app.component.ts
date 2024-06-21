import { Component } from '@angular/core';
import { User } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';

@Component({
   selector: 'app-root',
   // standalone: true,
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
   // imports: [RouterOutlet,HeaderComponent, UserComponent,CommonModule,TasksComponent],
})
export class AppComponent {
   users: User[] = DUMMY_USERS;
   selectedUserId?: string;

   get selectedUser() {
      return this.users.find((u) => u.id === this.selectedUserId);
   }

   onSelectUser(id: string) {
      this.selectedUserId = id;
   }
}

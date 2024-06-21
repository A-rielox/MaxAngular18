import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { User, UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';

@Component({
   selector: 'app-root',
   standalone: true,
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
   imports: [
      RouterOutlet,
      HeaderComponent,
      UserComponent,
      CommonModule,
      TasksComponent,
   ],
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

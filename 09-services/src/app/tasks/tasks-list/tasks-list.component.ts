import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
   selector: 'app-tasks-list',
   standalone: true,
   templateUrl: './tasks-list.component.html',
   styleUrl: './tasks-list.component.css',
   imports: [TaskItemComponent],
   providers: [taskStatusOptionsProvider], // p' inyectar un archivo con valores ( como el static de heb )
})
export class TasksListComponent {
   private tasksService = inject(TasksService);
   taskStatusOptions = inject(TASK_STATUS_OPTIONS);
   selectedFilter = signal<string>('all');
   // p'q se actualice cuando cambie la lista de tasks, computed va a volver a calcular la lista cuando la señal que está dentro de ella cambie ( crea una suscripciòn al valor signal y se le avisa cuando cambia para volver a correr la funciòn ) ( se va a recalcular cuando cualquiera de las signals que esten dentro cambien ) 💥💥
   // tasks = this.tasksService.allTasks;
   tasks = computed(() => {
      switch (this.selectedFilter()) {
         case 'all':
            return this.tasksService.allTasks();

         case 'open':
            return this.tasksService
               .allTasks()
               .filter((task) => task.status === 'OPEN');

         case 'in-progress':
            return this.tasksService
               .allTasks()
               .filter((task) => task.status === 'IN_PROGRESS');

         case 'done':
            return this.tasksService
               .allTasks()
               .filter((task) => task.status === 'DONE');

         default:
            return this.tasksService.allTasks();
      }
   });

   onChangeTasksFilter(filter: string) {
      this.selectedFilter.set(filter);
   }
}

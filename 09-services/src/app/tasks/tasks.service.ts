import { Injectable, inject, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
   providedIn: 'root',
})
export class TasksService {
   private tasks = signal<Task[]>([]); // p'q solo se pueda manipular desde aca
   private loggingService = inject(LoggingService);

   allTasks = this.tasks.asReadonly();

   constructor() {}

   addTask(taskData: { title: string; description: string }) {
      const newTask: Task = {
         ...taskData,
         id: Math.random().toString(),
         status: 'OPEN',
      };

      this.tasks.update((oldTask) => [...oldTask, newTask]);

      this.loggingService.log('Task added. 👍');
   }

   updateTaskStatus(taskId: string, newstatus: TaskStatus) {
      this.tasks.update((oldTasks) =>
         oldTasks.map((task) =>
            task.id === taskId ? { ...task, status: newstatus } : task,
         ),
      );
   }
}

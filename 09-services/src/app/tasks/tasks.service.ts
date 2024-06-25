import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
   providedIn: 'root',
})
export class TasksService {
   private tasks = signal<Task[]>([]); // p'q solo se pueda manipular desde aca
   allTasks = this.tasks.asReadonly();

   constructor() {}

   addTask(taskData: { title: string; description: string }) {
      const newTask: Task = {
         ...taskData,
         id: Math.random().toString(),
         status: 'OPEN',
      };

      this.tasks.update((oldTask) => [...oldTask, newTask]);
   }

   updateTaskStatus(taskId: string, newstatus: TaskStatus) {
      this.tasks.update((oldTasks) =>
         oldTasks.map((task) =>
            task.id === taskId ? { ...task, status: newstatus } : task,
         ),
      );
   }
}

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';

export interface Task {
   id: string;
   userId: string;
   title: string;
   summary: string;
   dueDate: string;
}

@Component({
   selector: 'app-task',
   standalone: true,
   templateUrl: './task.component.html',
   styleUrl: './task.component.css',
   imports: [DatePipe, CardComponent],
})
export class TaskComponent {
   @Input({ required: true }) task!: Task;
   @Output() complete = new EventEmitter<string>();

   onCompleteTask() {
      this.complete.emit(this.task?.id);
   }
}

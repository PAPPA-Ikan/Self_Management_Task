import { Injectable, signal } from '@angular/core';

import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  readonly tasks = signal<Task[]>([]);


  addTask(task: Task): void {
    this.tasks.update(tasks => [
      task,
      ...tasks,
    ]);
  }


  updateTask(updatedTask: Task): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  }


  deleteTask(id: string): void {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }


  toggleTask(task: Task): void {

    this.updateTask({
      ...task,
      status: task.status === 'done'
        ? 'todo'
        : 'done',
    });

  }

}
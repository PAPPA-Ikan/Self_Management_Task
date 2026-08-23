import { Injectable, signal } from '@angular/core';

import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  readonly tasks = signal<Task[]>([
    {
      id: crypto.randomUUID(),
      title: 'Learn Angular',
      description: 'Learn Angular fundamentals.',
      status: 'in-progress',
      priority: 'high',
      category: 'learning',
      dueDate: null,
      createdAt: new Date().toISOString(),
    },

    {
      id: crypto.randomUUID(),
      title: 'Build Task Dashboard',
      description: 'Create the task management dashboard.',
      status: 'todo',
      priority: 'medium',
      category: 'work',
      dueDate: null,
      createdAt: new Date().toISOString(),
    },

    {
      id: crypto.randomUUID(),
      title: 'Learn TypeScript',
      description: 'Review TypeScript fundamentals.',
      status: 'done',
      priority: 'low',
      category: 'learning',
      dueDate: null,
      createdAt: new Date().toISOString(),
    },
  ]);


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
import { Injectable, inject, signal } from '@angular/core';
import { Observable, from, map } from 'rxjs';

import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

import {
  Task,
  TaskStatus,
  TaskPriority,
  TaskCategory,
} from '../models/task';

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  due_date: string | null;
}

export type UpdateTaskInput = Partial<CreateTaskInput>;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly supabaseService = inject(SupabaseService);
  private readonly authService = inject(AuthService);

  private readonly tasksSignal = signal<Task[]>([]);
  readonly tasks = this.tasksSignal.asReadonly();

  /**
   * GET TASKS
   */
  loadTasks(): Observable<Task[]> {
    const user = this.authService.user();

    if (!user) {
      throw new Error('User is not authenticated');
    }

    return from(
      this.supabaseService.client
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false,
        }),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }

        const tasks = (data ?? []) as Task[];

        this.tasksSignal.set(tasks);

        return tasks;
      }),
    );
  }

  /**
   * CREATE TASK
   */
  createTask(
    input: CreateTaskInput,
  ): Observable<Task> {
    const user = this.authService.user();

    if (!user) {
      throw new Error('User is not authenticated');
    }

    return from(
      this.supabaseService.client
        .from('tasks')
        .insert({
          user_id: user.id,

          title: input.title,
          description: input.description,

          status: input.status,
          priority: input.priority,
          category: input.category,

          due_date: input.due_date,
        })
        .select()
        .single(),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }

        const task = data as Task;

        this.tasksSignal.update((tasks) => [
          task,
          ...tasks,
        ]);

        return task;
      }),
    );
  }

  /**
   * UPDATE TASK
   */
  updateTask(
    id: string,
    input: UpdateTaskInput,
  ): Observable<Task> {
    return from(
      this.supabaseService.client
        .from('tasks')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single(),
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }

      const updatedTask = data as Task;
        this.tasksSignal.update((tasks) =>
          tasks.map((task) => task.id === id
            ? updatedTask
            : task,
          ),
        );
        return updatedTask;
      }),
    );
  }

  /**
   * DELETE TASK
   */
  deleteTask(
    id: string,
  ): Observable<void> {
    return from(
      this.supabaseService.client
        .from('tasks')
        .delete()
        .eq('id', id),
    ).pipe(
      map(({ error }) => {
        if (error) {
          throw error;
        }

        this.tasksSignal.update((tasks) =>  
          tasks.filter( 
            (task) => task.id !== id,
          ),
        );
      }),
    );
  }

  /**
   * TOGGLE COMPLETE
   */
  toggleTask(
    task: Task,
  ): Observable<Task> {
    const status: TaskStatus =
      task.status === 'done'
        ? 'todo'
        : 'done';

    return this.updateTask(
      task.id,
      {
        status,
      },
    );
  }
}
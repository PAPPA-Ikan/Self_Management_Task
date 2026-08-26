import {
  Component,
  signal,
  computed,
  inject, OnInit
} from '@angular/core';

import {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from '../../core/models/task';

import { TaskService } from '../../core/services/task.service';

import { TaskForm, TaskFormValue, } from '../../shared/components/task-form/task-form';

import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-tasks',
  imports: [
    TaskForm,
    Header,
    Sidebar,
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit{

  private readonly taskService = inject(TaskService);
  readonly tasks = this.taskService.tasks;
  readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update(
      (open) => !open,
    );
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  ngOnInit(): void {
    this.taskService.loadTasks().subscribe({
      next: () => {
        console.log('Tasks loaded:', this.tasks());
      },
      error: (error) => {
        console.error('Failed to load tasks:', error);
      },
    });
  }

  /**
   * =========================
   * FILTER STATE
   * =========================
   */

  readonly searchQuery = signal('');

  readonly statusFilter =
    signal<'all' | TaskStatus>('all');

  readonly priorityFilter =
    signal<'all' | TaskPriority>('all');

  readonly categoryFilter =
    signal<'all' | TaskCategory>('all');

  /**
   * =========================
   * FILTERED TASKS
   * =========================
   */

  readonly filteredTasks = computed(() => {

    const query =
      this.searchQuery()
        .trim()
        .toLowerCase();

    const status =
      this.statusFilter();

    const priority =
      this.priorityFilter();

    const category =
      this.categoryFilter();

    return this.tasks().filter((task) => {

      const matchesSearch =
        query === '' ||
        task.title
          .toLowerCase()
          .includes(query) ||
        task.description
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === 'all' ||
        task.status === status;

      const matchesPriority =
        priority === 'all' ||
        task.priority === priority;

      const matchesCategory =
        category === 'all' ||
        task.category === category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  });

  /**
   * =========================
   * FILTER ACTIONS
   * =========================
   */

  setSearchQuery(value: string): void {
    this.searchQuery.set(value);
  }

  setStatusFilter(value: string): void {
    this.statusFilter.set(
      value as 'all' | TaskStatus,
    );
  }

  setPriorityFilter(value: string): void {
    this.priorityFilter.set(
      value as 'all' | TaskPriority,
    );
  }

  setCategoryFilter(value: string): void {
    this.categoryFilter.set(
      value as 'all' | TaskCategory,
    );
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('all');
    this.priorityFilter.set('all');
    this.categoryFilter.set('all');
  }

  /**
   * =========================
   * FORM STATE
   * =========================
   */

  readonly showForm = signal(false);

  readonly editingTask =
    signal<Task | null>(null);

  /**
   * =========================
   * CREATE
   * =========================
   */

  createTask(): void {
    this.editingTask.set(null);
    this.showForm.set(true);
  }

  /**
   * =========================
   * EDIT
   * =========================
   */

  editTask(task: Task): void {
    this.editingTask.set(task);
    this.showForm.set(true);
  }

  /**
   * =========================
   * SAVE
   * =========================
   */

  saveTask(data: TaskFormValue): void {

    const editing =
      this.editingTask();

    /**
     * EDIT EXISTING TASK
     */
    if (editing) {

      this.taskService
        .updateTask(
          editing.id,
          {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            category: data.category,
            due_date: data.due_date,
          },
        )
        .subscribe({
          next: () => {
            this.closeForm();
          },

          error: (error) => {
            console.error(
              'Failed to update task:',
              error,
            );
          },
        });

      return;
    }

    /**
     * CREATE NEW TASK
     */
    this.taskService
      .createTask({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        category: data.category,
        due_date: data.due_date,
      })
      .subscribe({
        next: () => {
          this.closeForm();
        },

        error: (error) => {
          console.error(
            'Failed to create task:',
            error,
          );
        },
      });
  }

  /**
   * =========================
   * DELETE
   * =========================
   */

  deleteTask(id: string): void {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this task?',
      );

    if (!confirmed) {
      return;
    }

    this.taskService
      .deleteTask(id)
      .subscribe({
        error: (error) => {
          console.error(
            'Failed to delete task:',
            error,
          );
        },
      });
  }

  /**
   * =========================
   * TOGGLE COMPLETE
   * =========================
   */

  toggleTask(task: Task): void {

    this.taskService
      .toggleTask(task)
      .subscribe({
        error: (error) => {
          console.error(
            'Failed to update task:',
            error,
          );
        },
      });
  }

  /**
   * =========================
   * CLOSE FORM
   * =========================
   */

  closeForm(): void {
    this.showForm.set(false);
    this.editingTask.set(null);
  }
}
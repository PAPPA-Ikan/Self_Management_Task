import { Component, signal, computed } from '@angular/core';
import { TaskForm } from '../../shared/components/task-form/task-form';
import { Task, TaskCategory, TaskPriority, TaskStatus } from '../../core/models/task';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-tasks',
  imports: [TaskForm, Header, Sidebar ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  readonly sidebarOpen = signal(false)

  toggleSidebar(): void{
    this.sidebarOpen.update((open) => !open)
  }
  closeSidebar(): void{
    this.sidebarOpen.set(false);
  }

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

  // =========================
  // Filter State
  // =========================

  readonly searchQuery = signal('');

  readonly statusFilter = signal<'all' | TaskStatus>('all');

  readonly priorityFilter = signal<'all' | TaskPriority>('all');

  readonly categoryFilter = signal<'all' | TaskCategory>('all');

  // =========================
  // Filtered Tasks
  // =========================

  readonly filteredTasks = computed(() => {

    const query = this.searchQuery()
      .trim()
      .toLowerCase();

    const status = this.statusFilter();

    const priority = this.priorityFilter();

    const category = this.categoryFilter();


    return this.tasks().filter(task => {

      // Search
      const matchesSearch =
        query === '' ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);


      // Status
      const matchesStatus =
        status === 'all' ||
        task.status === status;


      // Priority
      const matchesPriority =
        priority === 'all' ||
        task.priority === priority;


      // Category
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


  // =========================
  // Filter Actions
  // =========================

  setSearchQuery(value: string): void {
    this.searchQuery.set(value);
  }


  setStatusFilter(
    value: string
  ): void {

    this.statusFilter.set(
      value as 'all' | TaskStatus
    );

  }


  setPriorityFilter(
    value: string
  ): void {

    this.priorityFilter.set(
      value as 'all' | TaskPriority
    );

  }


  setCategoryFilter(
    value: string
  ): void {

    this.categoryFilter.set(
      value as 'all' | TaskCategory
    );

  }


  clearFilters(): void {

    this.searchQuery.set('');

    this.statusFilter.set('all');

    this.priorityFilter.set('all');

    this.categoryFilter.set('all');

  }

  readonly showForm = signal(false);

  readonly editingTask = signal<Task | null>(null);


  createTask(): void {
    this.editingTask.set(null);
    this.showForm.set(true);
  }


  editTask(task: Task): void {
    this.editingTask.set(task);
    this.showForm.set(true);
  }


  saveTask(
    data: Omit<Task, 'id' | 'createdAt'>
  ): void {

    const editing = this.editingTask();

    if (editing) {

      this.tasks.update(tasks =>
        tasks.map(task =>
          task.id === editing.id
            ? {
                ...task,
                ...data,
              }
            : task
        )
      );

    } else {

      const newTask: Task = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...data,
      };

      this.tasks.update(tasks => [
        newTask,
        ...tasks,
      ]);
    }

    this.closeForm();
  }


  deleteTask(id: string): void {

    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );

  }


  toggleTask(task: Task): void {

    const status =
      task.status === 'done'
        ? 'todo'
        : 'done';

    this.tasks.update(tasks =>
      tasks.map(item =>
        item.id === task.id
          ? {
              ...item,
              status,
            }
          : item
      )
    );

  }


  closeForm(): void {
    this.showForm.set(false);
    this.editingTask.set(null);
  }
}
import { Component, signal, computed, inject,  OnInit } from '@angular/core';

import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';
import { StatCard } from '../../shared/components/stat-card/stat-card';
import { Task, TaskCategory, TaskPriority, TaskStatus } from '../../core/models/task';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Sidebar,
    Header,
    StatCard,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly taskService = inject(TaskService);
  readonly tasks = this.taskService.tasks;
  readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  readonly totalTasks = computed(() => {
    return this.tasks().length;
  });

  readonly activeTasks = computed(() => {
    return this.tasks().filter(
      task => task.status !== 'done'
    ).length;
  });

  readonly completedTasks = computed(() => {
    return this.tasks().filter(
      task => task.status === 'done'
    ).length;
  });

  readonly todayTasks = computed(() => {
    return this.tasks()
      .filter(task => task.status !== 'done')
      .slice(0, 3);
  });

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

  // =========================
  // Task Actions
  // =========================
  toggleTask(task: Task): void {
    this.taskService.toggleTask(task);
  }
}
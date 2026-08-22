import { Component, signal } from '@angular/core';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';

@Component({
  imports: [Header, Sidebar],
  selector: 'app-tasks',
  styleUrl: './tasks.css',
  templateUrl: './tasks.html',
})
export class Tasks {
  readonly sidebarOpen = signal(false)

  toggleSidebar(): void{
    this.sidebarOpen.update((open) => !open)
  }

  closeSidebar(): void{
    this.sidebarOpen.set(false);
  }
}

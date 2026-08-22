import { Component,  signal } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  imports: [Header, Sidebar],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {
  readonly sidebarOpen = signal(false);
  
  toggleSidebar(): void{
    this.sidebarOpen.update((open)=> !open);
  }
  closeSidebar(): void{
    this.sidebarOpen.set(false);
  }
}

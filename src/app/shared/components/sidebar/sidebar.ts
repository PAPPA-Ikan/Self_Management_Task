import { Component, signal, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  // readonly isOpen = signal(false);
  readonly open = input(false);
  readonly close = output<void>();

  // Open(): void{
  //   this.isOpen.set(true);
  // }
  // Close(): void{
  //   this.isOpen.set(false);
  // }
  // toggle(): void{
  //   this.isOpen.update((open) => !open);
  // }

  closeSidebar(): void{
    this.close.emit();
  }

}

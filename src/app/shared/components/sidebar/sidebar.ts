import { Component, signal, input, output, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Router } from '@angular/router';

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

  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

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

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}

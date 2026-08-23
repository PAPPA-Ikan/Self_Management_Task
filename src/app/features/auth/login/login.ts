import {
  Component,
  inject,
  signal,
} from '@angular/core';

import {
  FormsModule,
} from '@angular/forms';

import {
  Router,
  RouterLink,
} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  readonly authService = inject(AuthService);

  private readonly router = inject(Router);


  email = '';

  password = '';

  readonly errorMessage = signal('');


  async submit(): Promise<void> {

    this.errorMessage.set('');

    try {

      await this.authService.login(
        this.email,
        this.password,
      );

      await this.router.navigate(['/']);

    } catch (error) {

      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'Login failed.',
      );

    }

  }

}
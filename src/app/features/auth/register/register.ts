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
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  readonly authService = inject(AuthService);

  private readonly router = inject(Router);


  email = '';

  password = '';

  readonly errorMessage = signal('');

  readonly successMessage = signal('');


  async submit(): Promise<void> {

    this.errorMessage.set('');
    this.successMessage.set('');

    try {

      await this.authService.register(
        this.email,
        this.password,
      );

      this.successMessage.set(
        'Account created. Please check your email to confirm your account.'
      );

    } catch (error) {

      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'Registration failed.',
      );

    }

  }

}
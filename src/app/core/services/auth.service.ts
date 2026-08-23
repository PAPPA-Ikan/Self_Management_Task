import { Injectable, inject, signal } from '@angular/core';

import { User } from '@supabase/supabase-js';

import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly supabase = inject(SupabaseService);

  readonly user = signal<User | null>(null);

  readonly loading = signal(false);


  async initialize(): Promise<void> {

    const {
      data,
      error,
    } = await this.supabase.client.auth.getUser();

    if (error) {
      this.user.set(null);
      return;
    }

    this.user.set(data.user);

  }


  async register(
    email: string,
    password: string,
  ): Promise<void> {

    this.loading.set(true);

    try {

      const {
        data,
        error,
      } = await this.supabase.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      this.user.set(data.user);

    } finally {

      this.loading.set(false);

    }

  }


  async login(
    email: string,
    password: string,
  ): Promise<void> {

    this.loading.set(true);

    try {

      const {
        data,
        error,
      } = await this.supabase.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      this.user.set(data.user);

    } finally {

      this.loading.set(false);

    }

  }


  async logout(): Promise<void> {

    this.loading.set(true);

    try {

      const {
        error,
      } = await this.supabase.client.auth.signOut();

      if (error) {
        throw error;
      }

      this.user.set(null);

    } finally {

      this.loading.set(false);

    }

  }
  
}
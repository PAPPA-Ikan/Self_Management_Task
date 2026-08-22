import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-stat-card',
  styleUrl: './stat-card.css',
  templateUrl: './stat-card.html',
})
export class StatCard {
  readonly title = input.required<string>();
  readonly value = input.required<string>();
  readonly description = input.required<string>();
}

import {
  Component,
  input,
} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  readonly title = input.required<string>();
  readonly value = input.required<number>();
  readonly description = input.required<string>();

}
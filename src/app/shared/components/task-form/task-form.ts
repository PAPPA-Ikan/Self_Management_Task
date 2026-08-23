import {
  Component,
  input,
  output,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from '../../../core/models/task';

type TaskFormControls = {
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<TaskStatus>;
  priority: FormControl<TaskPriority>;
  category: FormControl<TaskCategory>;
  dueDate: FormControl<string>;
};

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {

  readonly task = input<Task | null>(null);

  readonly save = output<Omit<Task, 'id' | 'createdAt'>>();

  readonly cancel = output<void>();

  readonly form = new FormGroup<TaskFormControls>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),

    description: new FormControl('', {
      nonNullable: true,
    }),

    status: new FormControl<TaskStatus>('todo', {
      nonNullable: true,
    }),

    priority: new FormControl<TaskPriority>('medium', {
      nonNullable: true,
    }),

    category: new FormControl<TaskCategory>('personal', {
      nonNullable: true,
    }),

    dueDate: new FormControl('', {
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    const task = this.task();

    if (!task) {
      return;
    }

    this.form.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate ?? '',
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit({
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      status: this.form.controls.status.value,
      priority: this.form.controls.priority.value,
      category: this.form.controls.category.value,
      dueDate: this.form.controls.dueDate.value || null,
    });
  }

  close(): void {
    this.cancel.emit();
  }
}
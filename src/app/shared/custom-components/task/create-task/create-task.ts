import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardDatePickerComponent } from '@/shared/components/date-picker';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardSelectItemComponent } from '@/shared/components/select/select-item.component';
import { ZardSelectImports } from '@/shared/components/select/select.imports';
import { TaskPriority, TaskStatus } from '@/types/task';
import { CommonModule } from '@angular/common';
import { inject, signal } from '@angular/core';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

type TaskForm = {
  title: FormControl<string>;
  description: FormControl<string | null>;
  project: FormControl<string>;
  assignedTo: FormControl<string>;
  dueDate: FormControl<Date | string>; // or Date if using date picker
  status: FormControl<TaskStatus>;
  priority: FormControl<TaskPriority>;
};
@Component({
  selector: 'app-create-tasks',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ZardSelectImports,
    ZardSelectItemComponent,
    ZardDatePickerComponent,
    ZardInputDirective,
    ZardButtonComponent,
  ],
  templateUrl: './create-task.html',
})
export class CreateTask {
  private zData = inject(Z_MODAL_DATA);
  selectedDate = signal<Date | null>(null);
  projects = [
    { value: '1', label: 'project1' },
    { value: '2', label: 'project2' },
    { value: '3', label: 'project3' },
  ];

  members = [
    { value: '1', label: 'member1' },
    { value: '2', label: 'member2' },
    { value: '3', label: 'member3' },
  ];

  status = [
    { value: '1', label: 'Todo' },
    { value: '2', label: 'Pending' },
    { value: '3', label: 'Review' },
    { value: '4', label: 'Done' },
  ];

  priority = [
    { value: '1', label: 'Low' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'High' },
  ];

  onDateChange(date: Date | null) {
    this.selectedDate.set(date);
  }

  taskForm = new FormGroup<TaskForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    }),

    description: new FormControl(null, {
      validators: [Validators.maxLength(255)],
    }),

    project: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    assignedTo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    dueDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    status: new FormControl('TODO', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    priority: new FormControl('MEDIUM', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngAfterViewInit(): void {
    if (this.zData) {
      this.taskForm.patchValue(this.zData);
    }
  }

  handleTask() {
    console.log('Task value', this.taskForm.getRawValue());
  }
}

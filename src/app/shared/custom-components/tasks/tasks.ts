import { ZardSelectItemComponent } from '@/shared/components/select/select-item.component';
import { ZardSelectImports } from '@/shared/components/select/select.imports';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [ReactiveFormsModule, CommonModule, ZardSelectImports, ZardSelectItemComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
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

  createTask = new FormGroup({});

  handleTask() {}
}

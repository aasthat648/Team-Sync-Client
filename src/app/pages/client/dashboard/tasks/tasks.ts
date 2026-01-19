import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Component, inject, signal } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { CreateTask } from '@/shared/custom-components/create-task/create-task';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';

@Component({
  selector: 'app-tasks',
  imports: [ZardButtonComponent, ZardIconComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private dialogService = inject(ZardDialogService);
  activeView = signal<'board' | 'table'>('board');
  openTask() {
    this.dialogService.create({
      zTitle: 'Create Task',
      zDescription: 'Create your own task',
      zContent: CreateTask,
      zWidth: '425px',
      zOkText: null,
      zCancelText: null,
      zClosable: true,
    });
  }
}

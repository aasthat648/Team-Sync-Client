import { Component, inject } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { CreateProject } from '@/shared/custom-components/create-project/create-project';

@Component({
  selector: 'app-dashboard',
  imports: [ZardButtonComponent, ZardIconComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private dialogService = inject(ZardDialogService);

  openProject() {
    console.log('Opening Create Project Dialog');
    this.dialogService.create({
      zTitle: 'Create Project',
      zDescription: 'Create your own project',
      zContent: CreateProject,
      zWidth: '425px',
      zOkText: null,
      zCancelText: null,
      zClosable: true,
    });
  }
}

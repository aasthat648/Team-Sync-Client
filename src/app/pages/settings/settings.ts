import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Workspace } from '@/types/workspace';
import { WorkspaceService } from '@/services/workspace';

type SettingFormControls = {
  name: FormControl<string>;
  description: FormControl<string>;
  inviteCode: FormControl<string>;
};
@Component({
  selector: 'app-settings',
  imports: [
    ZardAvatarComponent,
    ZardInputDirective,
    ZardButtonComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './settings.html',
})
export class Settings implements OnInit {
  constructor(
    private workspaceService: WorkspaceService,
    private cdr: ChangeDetectorRef,
  ) {}

  settingForm = new FormGroup<SettingFormControls>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(255)],
    }),
    inviteCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    }),
  });

  workspace: Workspace | null = null;

  ngOnInit(): void {
    this.workspaceService.currentWorkspace().subscribe({
      next: (res) => {
        if (!res.data) {
          return;
        }
        this.workspace = res.data;
        this.cdr.detectChanges();
      },
    });
  }

  handleSetting() {
    this.workspaceService.updateWorkspace(this.settingForm.getRawValue()).subscribe();
    console.log(this.settingForm.getRawValue());
  }
}

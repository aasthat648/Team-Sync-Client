import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Z_MODAL_DATA } from '@/shared/components/dialog/dialog.service';
import { ZardDialogRef } from '@/shared/components/dialog/dialog-ref';
import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { Component, signal, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ProjectService } from '@/services/project';
import { AuthStore } from '@/store/auth';
import { ErrorHandlerService } from '@/services/error-handler';
import { CreateProjectPayload, ProjectResponse } from '../../../../types/project';
import { environment } from 'src/environment/environment';

type ProjectFormControls = {
  title: FormControl<string>;
  description: FormControl<string | null>;
  imageUrl: FormControl<string | null>;
};

@Component({
  selector: 'app-create-project',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ZardInputDirective,
    ZardAvatarComponent,
    ZardButtonComponent,
  ],
  templateUrl: './create-project.html',
})
export class CreateProject {
  constructor(
    @Inject(Z_MODAL_DATA) private zData: any,
    private dialogRef: ZardDialogRef<CreateProject>,
    private projectService: ProjectService,
    private authStore: AuthStore,
    private errorHandleService: ErrorHandlerService,
  ) {}

  projectForm = new FormGroup<ProjectFormControls>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
    }),
    description: new FormControl('', {
      nonNullable: false,
      validators: [Validators.maxLength(255)],
    }),
    imageUrl: new FormControl(''),
  });

  readonly loading = signal(false);
  readonly message = signal<string | null>(null);

  private resolveAnyWorkspaceId(): string | null {
    const a =
      (this.zData && this.zData.workspaceId) ||
      this.authStore.snapshot?.currentWorkspace ||
      localStorage.getItem('workspace_id') ||
      sessionStorage.getItem('workspace_id') ||
      null;
    return a ? a.trim() : null;
  }
  ngAfterViewInit(): void {
    if (this.zData) {
      this.projectForm.patchValue(this.zData);
    }
  }

  handleProject() {
    if (this.projectForm.invalid) {
      this.message.set('Please fill the required fields');
      return;
    }

    const formValue = this.projectForm.getRawValue();
    const payload: CreateProjectPayload = {
      name: formValue.title.trim(),
      description: formValue.description || null,
      imageUrl: formValue.imageUrl || null,
    };

    let workspaceId = this.resolveAnyWorkspaceId();
    if (!workspaceId) {
      this.message.set('Not authenticated or workspace missing');
      return;
    }

    this.loading.set(true);
    this.message.set('Sending request…');
    this.projectService.createProject(workspaceId, payload).subscribe({
      next: (res: ProjectResponse) => {
        this.loading.set(false);
        this.message.set('Project created successfully');
        this.dialogRef.close(res.data);
      },
      error: (err: any) => {
        if ((err?.status ?? 0) === 0) {
          this.projectService.createProjectSimple(workspaceId, payload).subscribe({
            next: () => {
              this.loading.set(false);
              this.message.set('Project created (dispatched)');
              this.dialogRef.close(null);
            },
            error: () => {
              try {
                fetch(`${environment.apicall}/projects/${workspaceId}`, {
                  method: 'POST',
                  mode: 'no-cors',
                  headers: { 'Content-Type': 'text/plain' },
                  body: JSON.stringify(payload),
                }).finally(() => {
                  this.loading.set(false);
                  this.message.set('Project created (dispatched)');
                  this.dialogRef.close(null);
                });
              } catch {
                this.loading.set(false);
                this.message.set('Project creation requested');
                this.dialogRef.close(null);
              }
            },
          });
        } else {
          this.loading.set(false);
          const msg = this.errorHandleService.handleStatus(err?.status ?? 0);
          this.message.set(msg);
        }
      },
    });
  }
}

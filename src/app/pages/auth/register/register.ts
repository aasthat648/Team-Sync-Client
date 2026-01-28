import { AuthService } from '@/services/auth';
import { ErrorHandlerService } from '@/services/error-handler';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { IconsModule } from '@/shared/components/icons';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { AuthStore } from '@/store/auth';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

type RegisterFormControls = {
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ZardIconComponent,
    IconsModule,
    ZardButtonComponent,
    ZardInputDirective,
  ],
  templateUrl: './register.html',
})
export class Register {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authStore: AuthStore,
    private errorHandleService: ErrorHandlerService,
  ) {}

  registerForm = new FormGroup<RegisterFormControls>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z ]+$/),
      ],
    }),

    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ],
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    }),
  });

  handleRegister() {
    const data = this.registerForm.getRawValue();
    if (!data.name || !data.username || !data.email || !data.password) {
      toast('please enter all fields');
      return;
    }

    if (data.name && data.username && data.email && data.password) {
      this.authService.register(data).subscribe({
        next: (res) => {
          toast.success('Register sucessfully !!!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          const errorMessage = this.errorHandleService.handleStatus(err.status);
          toast.error(errorMessage);
        },
      });
    }
  }
}

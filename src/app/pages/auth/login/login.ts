import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { IconsModule } from '@/shared/components/icons';
import { ZardCheckboxComponent } from '@/shared/components/checkbox/checkbox.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '@/services/auth';
import { ErrorHandlerService } from '@/services/error-handler';

type LoginFormControls = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ZardInputDirective,
    ZardIconComponent,
    IconsModule,
    ZardCheckboxComponent,
    ZardButtonComponent,
    RouterLink,
  ],
  templateUrl: './login.html',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandleService: ErrorHandlerService,
  ) {}

  loginForm = new FormGroup<LoginFormControls>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    }),
  });
  handleLogin() {
    const data = this.loginForm.getRawValue();

    if (!data.email || !data.password) {
      toast('Please enter email and password');
      return;
    }

    this.authService.login(data).subscribe({
      next: (res) => {
        toast.success('Successful Login!!!');

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const errorMessage = this.errorHandleService.handleStatus(err.status);
        toast.error(errorMessage);
      },
    });
  }
}

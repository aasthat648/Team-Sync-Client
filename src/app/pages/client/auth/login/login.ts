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
import { Authservice } from '@/shared/services/auth/authservice';

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
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authservice: Authservice,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  handleLogin() {
    const { email, password } = this.loginForm.value;

    if (!email || !password) {
      return alert('Please enter email and password');
    }

    this.authservice.login(email, password).subscribe({
      next: (res) => {
        console.log('Data', res.data);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('Error', err.error.error);
        // 400 -- Something went wrong
        // 404 -- Invalid email and password
        // 500 -- Internal server error
      },
    });
  }
}

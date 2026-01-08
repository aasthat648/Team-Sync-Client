import { ZardButtonComponent } from '@/shared/components/button/button.component';

import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { IconsModule } from '@/shared/components/icons';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { Authservice } from '@/shared/services/auth/authservice';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  styleUrl: './register.css',
})
export class Register {
  constructor(private authservice: Authservice) {}

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z0-9_]+$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  handleRegister() {
    const { name, username, email, password } = this.registerForm.value;
    if (!name || !username || !email || !password) {
      alert('please enter all fields');
      return;
    }
    this.authservice.register(name, username, email, password).subscribe({
      next: (res) => {
        console.log(res.data);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}

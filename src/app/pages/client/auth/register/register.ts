import { ZardButtonComponent } from '@/shared/components/button/button.component';

import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { IconsModule } from '@/shared/components/icons';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
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
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
  }
}

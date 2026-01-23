import { ZardAvatarComponent } from '@/shared/components/avatar/avatar.component';
import { Component } from '@angular/core';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

@Component({
  selector: 'app-settings',
  imports: [ZardAvatarComponent, ZardInputDirective, ZardButtonComponent],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {}

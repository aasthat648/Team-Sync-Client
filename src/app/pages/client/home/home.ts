import { ThemeComponent } from '@/shared/components/theme/theme';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ThemeComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

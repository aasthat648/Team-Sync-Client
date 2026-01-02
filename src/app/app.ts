import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconsModule } from './shared/components/icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IconsModule],
  templateUrl: './app.html',
})
export class App {}

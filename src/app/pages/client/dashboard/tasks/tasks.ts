import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardSegmentedComponent } from '@/shared/components/segmented/segmented.component';
import { Component } from '@angular/core';
import { icons } from 'lucide-angular';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';

@Component({
  selector: 'app-tasks',
  imports: [ZardButtonComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {}

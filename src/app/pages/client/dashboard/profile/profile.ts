import { Z_SHEET_DATA } from '@/shared/components/sheet';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private zData = inject(Z_SHEET_DATA);
  profile = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
  });

  ngAfterViewInit(): void {
    if (this.zData) {
      this.profile.patchValue(this.zData);
    }
  }
}

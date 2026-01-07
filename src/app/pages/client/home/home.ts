import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ZardIconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  year = new Date().getFullYear();
  openIndex = -1;
  setOpen(index: number, event: Event) {
    const target = event.target as HTMLDetailsElement;
    if (target.open) {
      this.openIndex = index;
    } else {
      if (this.openIndex === index) {
        this.openIndex = -1;
      }
    }
  }

}
